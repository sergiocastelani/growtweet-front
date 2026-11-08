import { styled, css } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { LoginForm } from "./login-form";
import { CenteredPage, Panel } from "../../components/ui/panel";

export function LoginPage()
{
    const navigate = useNavigate();

    return (
        <CenteredPage>
            <SplitPanel>
                <WelcomePanel>
                    <h2>Wellcome to</h2>
                    <h1>GrowTweet</h1>
                    <small>Inspirational activity for the course Full Stack Web Starter, from Growdev</small>
                    <p>
                        An innovative social media application designed to mimic the user-friendly interface and real-time communication features of Twitter.
                        GrowTweet offers a seamless and dynamic platform for users to share their thoughts, updates, and engage in conversations with a global audience.
                    </p>
                </WelcomePanel>
                <FormPanel>
                    <h1>Come in...</h1>
                    <LoginForm onSuccess={()=> navigate('/')}/>
                    <CreateAccountLink to="/new-account">Create your new account</CreateAccountLink>
                </FormPanel>
            </SplitPanel>
        </CenteredPage>
    )
}

/** Width at which the two halves stack (unchanged from the current page). */
const STACK_BREAKPOINT = "768px";
/** Hero title: one and a half times the largest type-scale step (48px), between the old 64px and the scale's 32px. */
const HERO_TITLE_SIZE = "calc(var(--font-size-2xl) * 1.5)";
/** Side-by-side card never narrower than this, so the hero title and the form both fit just above the stack breakpoint. */
const SIDE_BY_SIDE_MIN_WIDTH = "600px";

const SplitPanel = styled(Panel)`
    display: flex;
    align-items: stretch;
    padding: 0;
    overflow: hidden;
    width: max(60%, ${SIDE_BY_SIDE_MIN_WIDTH});
    min-width: 250px;
    min-height: max(400px, 60dvh);

    @media (width <= ${STACK_BREAKPOINT}) {
        flex-direction: column;
        width: 80%;
    }
`;

const halfStyles = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    padding: var(--space-6);

    @media (width <= ${STACK_BREAKPOINT}) {
        padding: var(--space-5);
    }
`;

const WelcomePanel = styled.div`
    ${halfStyles}
    background-color: var(--color-accent-subtle);
    border-right: 1px solid var(--color-border);

    & h2 {
        margin: 0;
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-semibold);
        color: var(--color-text-secondary);
    }

    & h1 {
        margin: 0;
        font-size: ${HERO_TITLE_SIZE};
        font-weight: var(--font-weight-bold);
        line-height: var(--line-height-tight);
        color: var(--color-accent);
    }

    & small {
        display: block;
        margin-top: var(--space-2);
        font-size: var(--font-size-xs);
        color: var(--color-text-muted);
    }

    & p {
        margin: var(--space-5) 0 0;
        font-size: var(--font-size-sm);
        line-height: var(--line-height-base);
        color: var(--color-text-secondary);
    }

    @media (width <= ${STACK_BREAKPOINT}) {
        border-right: none;
        border-bottom: 1px solid var(--color-border);

        & h2 {
            font-size: var(--font-size-md);
        }

        & h1 {
            font-size: var(--font-size-2xl);
        }

        & p {
            margin-top: var(--space-4);
        }
    }
`;

const FormPanel = styled.div`
    ${halfStyles}
    min-width: 0;
    gap: var(--space-5);

    & h1 {
        margin: 0;
        font-size: var(--font-size-xl);
        font-weight: var(--font-weight-bold);
        line-height: var(--line-height-tight);
        color: var(--color-text);
    }
`;

const CreateAccountLink = styled(Link)`
    align-self: flex-end;
    padding: var(--space-3) 0;
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-semibold);
    color: var(--color-accent);
    text-decoration: underline;
    text-underline-offset: 2px;
    transition: color var(--duration-fast) var(--ease-out);

    &:hover {
        color: var(--color-accent-hover);
    }

    &:active {
        color: var(--color-accent-pressed);
    }
`;
