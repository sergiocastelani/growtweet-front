---
name: rff-create
description: Turn a rough feature concept into a complete "request-for-feature.md" spec through a Q&A session. Use when the user says "grill me", wants to refine or flesh out a feature idea, or wants a feature request/spec written from a report file or from ideas discussed in the current session. Asks the user for a feature name, creates the feature folder ".rff/<feature-name>/" at the project root, asks targeted questions with options, then writes the final markdown file into that folder.
argument-hint: "[path to report file | short description of the idea]"
---

# rff-create

Interview the user about a feature concept until it is clear enough to implement, then write `request-for-feature.md` into the feature's own folder.

## Feature folder

Every file of an rff request lives in a folder exclusive to that request: `<project-root>/.rff/<feature-name>/` (the **feature folder**, `<feature-dir>` below). `<project-root>` is the git top level (`git rev-parse --show-toplevel`); without a git repository, it is the working directory, or the parent of `.rff/` when the working directory is inside a `.rff/` folder. The other rff skills (`rff-plan`, `rff-steps`, `rff-implement`) read and write only inside this folder.

## 1. Gather the concept

Find the source of the idea, in this order:

1. **Argument given** (`$ARGUMENTS`): if it is a file path, read the whole file; otherwise treat it as the idea itself.
2. **Current session**: if no argument, look back through this conversation for the feature idea being discussed.
3. **Nothing found**: ask the user to describe the idea or point to a report file.

If the idea targets a codebase that is available (`<project-root>` or a path the user names), explore the relevant parts briefly (structure, conventions, related features, tech stack) so questions are grounded in what exists and options fit the current architecture. Do not ask things the code already answers.

Then give the user a short summary (3 to 6 bullets) of your understanding of the concept, so misunderstandings surface early.

## 2. Name the feature and prepare its folder

1. Ask the user for the feature name with `AskUserQuestion`: offer 2 or 3 short names derived from the concept (your recommendation first, suffixed "(Recommended)"); the user can type their own with "Other".
2. Normalize the name into a folder name: lowercase, words separated by single hyphens, only `a-z`, `0-9` and `-` (strip accents, turn spaces, underscores and other separators into hyphens, drop other characters, trim leading and trailing hyphens). Example: "New Feature" → `new-feature`. Tell the user the resulting folder name.
3. If `<project-root>/.rff/<feature-name>/` already exists, ask with `AskUserQuestion` whether to **use the existing folder** (its files stay; an existing `request-for-feature.md` is handled in section 5) or **pick another name** (back to step 1).
4. Create the folder (and `.rff/` itself, if missing). From here on it is the feature folder for the rest of the session: the other rff skills use it without asking again.

## 3. Build the list of open points

Identify what is unclear, missing, ambiguous or contradictory. Check these areas and keep only the ones that matter for this feature:

- **Goal and users**: problem solved, who uses it, success criteria
- **Scope**: what is in, what is explicitly out, MVP versus later
- **Behavior**: main flow, alternative flows, edge cases, empty and error states
- **UI/UX**: where it lives, layout, interactions, responsiveness, accessibility
- **Data**: what is stored, shape, validation, migration of existing data
- **Integration**: APIs, services, existing modules affected, backward compatibility
- **Permissions and security**: who can do what, sensitive data
- **Non-functional**: performance, limits, offline, i18n, logging/analytics
- **Testing and acceptance**: how we know it works

Prioritize: questions whose answers change many other decisions come first.

## 4. Grill: the Q&A loop

Use the `AskUserQuestion` tool for every question round.

- Ask **1 to 4 related questions per round**, highest-priority first.
- Every question gets **2 to 4 concrete options**, each with a short description of its consequence or trade-off. Put your recommended option first and suffix its label with "(Recommended)". The user can always pick "Other" to answer freely.
- Use `multiSelect: true` when choices are not mutually exclusive (e.g. which platforms, which fields).
- Make each question self-contained: the user may only see the dialog.
- After each round:
  - Record the decisions (keep a running decision log in your head, or in a scratch file inside the feature folder that you delete once the spec is written).
  - Re-evaluate: answers often resolve, remove, or spawn other open points. Ask follow-ups when an answer is vague or creates a new ambiguity. Challenge contradictions with earlier answers.
- Every 2 or 3 rounds, briefly state what is now settled and roughly how many open points remain.

**Ending the loop.** Stop when either:
- All points that would block implementation are settled. Then ask one confirmation question ("Ready to write the spec?") with options like "Write it now" and "Keep refining".
- The user says they are done (e.g. "done", "that's enough", "write it"). Stop immediately; any unresolved points go into the "Open questions" section of the spec, together with your recommended default.

## 5. Write `<feature-dir>/request-for-feature.md`

The file always goes in the feature folder: `<feature-dir>/request-for-feature.md`. If it already exists there, ask with `AskUserQuestion` whether to overwrite it or stop (the user can then run again with another feature name).

Write it so a developer (or an agent) who never saw this conversation can implement the feature. Be concrete; use the user's decisions, not your guesses. Mark any assumption you made as an assumption. Omit sections that genuinely do not apply.

```markdown
# Feature Request: <Feature name>

- **Date:** <YYYY-MM-DD>
- **Source:** <report file path / current session>
- **Status:** Ready for implementation | Draft (open questions remain)

## 1. Summary
One paragraph: what the feature is and why it matters.

## 2. Problem and goals
- Problem being solved
- Goals / success criteria (measurable when possible)
- Non-goals (explicitly out of scope)

## 3. Users and use cases
Who uses it and the main scenarios, as short user stories:
"As a <user>, I want <action> so that <benefit>."

## 4. Functional requirements
Numbered, testable requirements (FR-01, FR-02, ...).

## 5. Behavior and flows
Main flow step by step, alternative flows, edge cases, empty and error states.

## 6. UI / UX
Where it appears, layout, interactions, states, responsive behavior, accessibility.

## 7. Data model
Entities/fields, types, validation rules, storage, migrations.

## 8. Integration and technical notes
Affected files/modules/components, APIs, dependencies, compatibility,
constraints from the existing codebase.

## 9. Non-functional requirements
Performance, security/permissions, i18n, logging/analytics, limits.

## 10. Acceptance criteria
Checklist in Given / When / Then form, covering the main flow and key edge cases.

## 11. Decisions log
| # | Question | Decision | Rationale |
|---|----------|----------|-----------|

## 12. Open questions
Unresolved points, each with the recommended default. (Omit if none.)

## 13. Future ideas
Things discussed but deferred to later iterations. (Omit if none.)
```

## 6. Finish

Tell the user the feature folder and the file path (as a clickable markdown link), give a 2 or 3 line summary of the spec, and list any open questions that remain. Mention that `rff-plan` is the next step and works in the same folder.

## Guidelines

- Be a demanding but efficient interviewer: no filler questions, no questions the code or earlier answers already settle.
- Prefer options that fit the existing codebase's patterns; say so in the option description.
- Never invent requirements silently: either ask, or record it as an assumption / open question.
- Write the spec in the same language the user used during the session, unless they ask otherwise.
