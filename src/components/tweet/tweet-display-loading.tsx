import ContentLoader from "react-content-loader";
import { styled } from "styled-components";
import { readThemeColor } from "../ui/theme-color";

export interface TweetDisplayLoadingProps
{
    opacity?: number;   // default 1; opacity of the whole skeleton row (fades successive rows)
}

const SKELETON_BACKGROUND_TOKEN = "--color-surface-2";
const SKELETON_SHIMMER_TOKEN = "--color-border";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function prefersReducedMotion(): boolean
{
    return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

export function TweetDisplayLoading(props: TweetDisplayLoadingProps) 
{
    const {opacity = 1} = props;

    return (
        <Wrapper>
            <ContentLoader
                speed={2}
                width={400}
                height={60}
                viewBox="0 0 400 60"
                backgroundColor={readThemeColor(SKELETON_BACKGROUND_TOKEN)}
                foregroundColor={readThemeColor(SKELETON_SHIMMER_TOKEN)}
                animate={!prefersReducedMotion()}
                style={{ opacity }}
            >
                <circle cx="24" cy="24" r="24" />
                <rect x="65" y="2" rx="5" ry="5" width="170" height="10" />
                <rect x="240" y="2" rx="5" ry="5" width="100" height="10" />
                <rect x="350" y="2" rx="5" ry="5" width="20" height="10" />
                <rect x="65" y="22" rx="5" ry="5" width="250" height="10" />
                <rect x="65" y="40" rx="5" ry="5" width="30" height="20" />
                <rect x="115" y="40" rx="5" ry="5" width="30" height="20" />
            </ContentLoader>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    margin: 0;
    padding: var(--space-3) var(--space-4);
    border-top: 1px solid var(--color-border);
`;
