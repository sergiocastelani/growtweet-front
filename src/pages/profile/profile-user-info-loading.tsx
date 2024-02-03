import ContentLoader from "react-content-loader";

export function ProfileUserInfoLoading()
{
    return (
        <>
            <ContentLoader
                speed={2}
                width={400}
                height={150}
                viewBox="0 0 400 150"
                backgroundColor="#dedede55"
                foregroundColor="#ffffff"
            >
                <circle cx="48" cy="48" r="48" />
                <rect x="8" y="105" rx="5" ry="5" width="200" height="15" />
                <rect x="8" y="132" rx="5" ry="5" width="150" height="15" />
            </ContentLoader>
        </>
    );
}
