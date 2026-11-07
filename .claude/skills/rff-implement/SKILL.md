---
name: rff-implement
description: Implement the step design files ".rff/step-NN.md" (written by rff-steps) one step at a time, each through an implementation-review loop run by two separate agents. The implementer and the reviewer both start with a clean context when the step starts and keep it through every round of that step; the next step gets a new pair. The implementer may deviate from the step's implementation suggestions, but must leave every test the step defines existing and passing. The reviewer works at high effort and focuses on regressions. Use when the user wants to implement, build, code or execute the steps of a feature request, or names a step file to implement.
argument-hint: "[step file paths or ids, e.g. .rff/step-03.md or S02,S05 | empty for all steps in .rff/]"
---

# rff-implement

Implement the step files in `.rff/` (`.rff/step-01.md`, `.rff/step-02.md`, ...), **one step at a time**:

1. Each step is implemented by a **new implementer agent** with a clean context.
2. The result is reviewed by a **new reviewer agent**, a different agent, also with a clean context, working at **high effort** and focused on **regressions**.
3. Implementer and reviewer loop (fix, re-review) until the reviewer passes the step.
4. Only then does the **next step** start.

**Agent lifetime.** The implementer and the reviewer of a step are both started fresh at the start of that step's loop, and both keep their context until the step's loop is over (passed, skipped or stopped). Every fix goes back to the same implementer and every re-review goes back to the same reviewer, with `SendMessage`. The next step gets a new implementer and a new reviewer.

You are the orchestrator. Keep your own context light: you do not write code, review code or run the step's tests yourself. The implementation rules live in `implement.md` and the review rules in `review.md`, next to this `SKILL.md` (in this skill's base directory).

## 1. Find the steps

1. **Pick the step files.**
   - If `$ARGUMENTS` names step files (paths) or step ids (`S03`, `S02,S05`, `S04-S07`; `S03` → `.rff/step-03.md`), use only those. If one does not exist, tell the user and stop.
   - Otherwise use every `.rff/step-*.md` file.
   - If no step file is found, tell the user to run `rff-steps` first, and stop.
2. **Order them.** If `.rff/plan.md` exists, order by its execution stages, then by step id, so each step comes after the steps it depends on. Otherwise order by step number.
3. **Check design status.** If `.rff/design-contract.md` exists and a selected step is not `approved` there, warn the user and ask with `AskUserQuestion` whether to implement it anyway or skip it.
4. **Resume.** Read the implementation log (section 2). Steps marked `done` are skipped unless the user named them in `$ARGUMENTS`; if a named step is already `done`, ask whether to re-implement it or skip it.

## 2. Implementation log and checkpoints

The log, `.rff/implementation-log.md`, is the memory shared across steps and runs. Create it if missing:

```markdown
# Implementation Log

- **Updated:** <YYYY-MM-DD>

| Step | File | Status | Rounds | Checkpoint | Notes |
|------|------|--------|--------|-----------|-------|
| S01 | [step-01.md](step-01.md) | pending | 0 | - | - |

Status: pending | in-progress | done | skipped | blocked

## Deviations
Deviations from a step file's implementation suggestions, as reported by its implementer and accepted by its reviewer.
- (S01) ...

## Checks confirmed by the user
- (S01) ...
```

**Checkpoints.** The reviewer must see exactly what the current step changed. Before the first step of this run, if the working tree has uncommitted changes, show `git status --short` to the user and ask how to proceed (commit them, keep them as part of the baseline, or stop). Then ask once per run, with `AskUserQuestion`, how to checkpoint each finished step:

- **Commit each step** (recommended): after a step passes, commit all its changes with the message `feat(rff): <step id> - <step title>`.
- **Stage each step**: after a step passes, run `git add -A`, so the next step's changes are the unstaged diff.

Record the checkpoint (commit hash, or `staged`) in the log. The step's diff for the reviewer is then the working tree against that checkpoint (`git diff HEAD` plus untracked files when committing; `git diff` plus untracked files when staging). Tell both agents never to commit, stage, stash, reset or switch branches.

## 3. The step loop

For each step, in order, run the full cycle below. Never start the next step before the current one is `done`, or explicitly skipped or stopped by the user.

Set the step's status to `in-progress` in the log.

### 3.1 Implement in a clean context

Start a **new** implementer with the Agent tool (`subagent_type: general-purpose`; never `fork`, which would carry this conversation; never an agent from an earlier step). Brief it with:

- The step id and title.
- Absolute paths to: `implement.md` (in this skill's base directory), the step file, `.rff/design-contract.md` (when it exists), and `.rff/implementation-log.md`. Nothing else: no `.rff/plan.md`, no source feature request, no other step files. The agent also reads `CLAUDE.md` and the other global project instruction files on its own.
- The checkpoint the step starts from, and the git rules above.
- The instruction: "Follow `implement.md` exactly. Implement only this step. You may deviate from the step file's implementation suggestions, but when you finish, every test and check the step file defines must exist and pass. Report back in the format at the end of `implement.md`. You will receive the reviewer's findings and must fix them until the step passes review."

Do not paste the step file, the code or other files into the brief. Keep the agent id.

If the implementer reports status `blocked`, go to 3.4.

### 3.2 Review in a clean context

The step is reviewed by a reviewer agent, never by you and never by the implementer.

**First review of the step.** Start a **new** reviewer with the Agent tool (`subagent_type: general-purpose`, `effort: "high"`; never `fork`, and never a reviewer from an earlier step). Brief it with:

- The step id and title, and the checkpoint the step started from (so it can diff the step's changes).
- Absolute paths to: `review.md` (in this skill's base directory), the step file, `.rff/design-contract.md` (when it exists), and `.rff/implementation-log.md`. Nothing else: no `.rff/plan.md`, no source feature request, and no step files of earlier steps. Regressions are checked from the diff, treating every existing behavior the step file does not mention as already well established.
- The implementer's **Deviations** and **Test results** sections, verbatim, so it can check them. Nothing else from the implementer's report.
- The instruction: "Follow `review.md` exactly. Focus on regressions. Do not edit, stage or commit any file. Report back in the format at the end of `review.md`. You will be asked to re-review after each fix until the step passes."

Keep its agent id.

**Later reviews of the same step:** send the same reviewer a message with `SendMessage`: "The implementer fixed your findings. Re-review following `review.md` section 5 and report in the same format.", followed by the implementer's new **Deviations** and **Test results** sections, verbatim.

Never give the reviewer your opinion or the rest of this conversation.

Act on the verdict:

- `pass`: go to 3.3.
- `fail`: send the findings, as the reviewer wrote them, to the **same implementer** with `SendMessage`, and wait for its report (a `blocked` report goes to 3.4). Then run another review round with the same reviewer.
- `blocked`: go to 3.4.
- After **5** failed rounds, stop the loop and go to 3.4 with the remaining findings.

### 3.3 Close the step

1. If the implementer listed checks as `needs-human` (checks no agent tool could run, for example a visual judgment), and the reviewer did not reject that classification, present them to the user with the exact steps from the step file and ask with `AskUserQuestion`: **All pass** / **Some fail** (the user describes which; send it in their words to the same implementer and repeat 3.2). Record confirmed checks in the log.
2. Checkpoint the step (commit or stage, as chosen in section 2).
3. Update the log: status `done`, the number of review rounds, the checkpoint, and the accepted deviations.
4. Tell the user in one line that the step is done (with any notable deviation) and which step comes next, then start 3.1 for the next step.

The step's loop is now over: its implementer and reviewer are not used again.

### 3.4 Blocked steps

A step is blocked when the implementer or the reviewer reports `blocked` (the step cannot be completed inside its own scope: it needs changes owned by another step, a prerequisite is missing, a defined test is impossible or contradicts the step's own requirements), or after 5 failed review rounds.

1. Stop. Do not fix it yourself and do not start the next step.
2. Set the step to `blocked` in the log, with a one-line reason.
3. Show the user the reason, the evidence and the agents' suggestions, and ask with `AskUserQuestion`:
   - **Give guidance**: the user's answer goes, in their words, to the same implementer, and the loop continues at 3.2 with the same reviewer.
   - **Skip this step**: leave its changes in place, mark it `skipped`, and continue with the next step only if no later selected step depends on it.
   - **Discard and stop**: revert the step's changes to the checkpoint (confirm with the user first, listing the files affected), and end the run.

## 4. Finish

When every selected step is `done` or `skipped`, or the run was stopped:

- List the step files, as clickable markdown links, with their status, review rounds and checkpoint.
- List the deviations recorded in the log, the checks the user confirmed, and any step left `skipped` or `blocked`.
- If you staged instead of committing, say that nothing is committed yet.

## Guidelines

- One step at a time, always. No parallel agents, no batching of steps.
- Implementer and reviewer are always different agents. Both start with a clean context at the start of a step's loop and keep it until that loop is over; they are never reused for another step. You never implement or review a step yourself.
- The reviewer always runs with `effort: "high"`.
- The step file's tests and checks are the bar: a step is done only when they all exist and pass (agent-verified, or confirmed by the user for `needs-human` checks), and existing behavior the step does not mention is unchanged.
- Keep both agents' context minimal: the step file, global project instructions (`CLAUDE.md` and similar), the workflow control files (`implement.md` / `review.md`, `.rff/design-contract.md`) and the log (`.rff/implementation-log.md`), plus the code itself. Never brief them with the plan or other step files.
- Forward findings and user feedback faithfully; do not reinterpret them.
- Write in the same language as the step files.
