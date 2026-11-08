import { styled, css } from "styled-components";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { LuHash, LuHouse, LuLogIn, LuSquarePlus, LuUser } from "react-icons/lu";
import { ApiAuth } from "../api/api-auth";
import { TweetNewForm } from "./tweet/tweet-new-form";
import { IconButton } from "./ui/icon-button";

/** Tap target of every bar item; fits inside the 56px bar content height with room to spare (FR-09, FR-21). */
const BAR_ITEM_SIZE = "44px";

/** Icon stroke of the item for the current route (Lucide default is 2), the "bolder weight" of FR-08. */
const ACTIVE_ICON_STROKE_WIDTH = 2.5;

/** Scale while a nav link is pressed; same strength as the shared IconButton. */
const NAV_ITEM_PRESSED_SCALE = 0.97;

export function NavBarMobile()
{
    const [showNewTweetForm, setShowNewTweetForm] = useState(false);
    const userInfo = ApiAuth.getLoggedUser();

    return (
        <Wrapper aria-label="Mobile navigation">
            <NavItem to="/" end aria-label="Home"><LuHouse aria-hidden="true"/></NavItem>
            <NavItem to="/explore" aria-label="Explore"><LuHash aria-hidden="true"/></NavItem>

            {userInfo &&
                <NavItem to={`/profile/${userInfo.id}`} aria-label="My Profile"><LuUser aria-hidden="true"/></NavItem>
            }

            {userInfo &&
                <NewTweetButton aria-label="New tweet" onClick={() => setShowNewTweetForm(true)}>
                    <LuSquarePlus aria-hidden="true"/>
                </NewTweetButton>
            }

            {(userInfo == null) &&
                <NavItem to="/login" aria-label="Login"><LuLogIn aria-hidden="true"/></NavItem>
            }

            {showNewTweetForm &&
                <TweetNewForm
                    onCreated={() => window.location.reload()}
                    onCancel={() => setShowNewTweetForm(false)}
                />
            }
        </Wrapper>
    );
}

const Wrapper = styled.nav`
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-shrink: 0;
    width: 100%;
    height: calc(var(--mobile-nav-height) + env(safe-area-inset-bottom));
    margin: 0;
    padding: 0 var(--space-4) env(safe-area-inset-bottom);
    background-color: var(--color-surface-0);
    border-top: 1px solid var(--color-border);

    @media (width > 600px) {
        display: none;
    }
`;

const barItemBox = css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: ${BAR_ITEM_SIZE};
    height: ${BAR_ITEM_SIZE};
    padding: 0;
    border-radius: var(--radius-pill);
    color: var(--color-text-secondary);

    & svg {
        font-size: var(--font-size-xl);
        flex-shrink: 0;
    }

    @media (hover: hover) {
        &:hover:not(:disabled) {
            background-color: var(--color-surface-hover);
            color: var(--color-text);
        }
    }
`;

const NavItem = styled(NavLink)`
    ${barItemBox}
    text-decoration: none;
    transition: background-color var(--duration-fast) var(--ease-out),
                color var(--duration-fast) var(--ease-out),
                transform var(--duration-fast) var(--ease-out);

    &:active {
        transform: scale(${NAV_ITEM_PRESSED_SCALE});
    }

    &[aria-current="page"],
    &[aria-current="page"]:hover {
        color: var(--color-accent);
    }

    &[aria-current="page"] svg {
        stroke-width: ${ACTIVE_ICON_STROKE_WIDTH};
    }
`;

const NewTweetButton = styled(IconButton)`
    ${barItemBox}

    @media (hover: none) {
        &:hover:not(:disabled) {
            background-color: transparent;
            color: var(--color-text-secondary);
        }
    }
`;
