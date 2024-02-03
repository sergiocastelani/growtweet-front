import ContentLoader from "react-content-loader";
import { styled } from "styled-components";

export interface TweetDisplayLoadingProps
{
    opacity?: number;
}

export function TweetDisplayLoading(props: TweetDisplayLoadingProps) 
{
    const {opacity = 0.3} = props;
    const brightOpacity = opacity + 0.3;

    return (
        <Wrapper>
            <ContentLoader
                speed={2}
                width={400}
                height={60}
                viewBox="0 0 400 60"
                backgroundColor={`rgba(255, 255, 255, ${opacity})`}
                foregroundColor={`rgba(255, 255, 255, ${brightOpacity})`}
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
    border-width: 1px 0 0 0;
    border-style: solid;
    border-color: color-mix(in srgb, var(--color-3) 30%, transparent);
    margin: 0;
    padding: 1rem;
`;
