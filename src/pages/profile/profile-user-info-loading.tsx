import ContentLoader from "react-content-loader";
import { readThemeColor } from "../../components/ui/theme-color";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function ProfileUserInfoLoading()
{
    const prefersReducedMotion = window.matchMedia(REDUCED_MOTION_QUERY).matches;

    return (
        <ContentLoader
            speed={2}
            animate={!prefersReducedMotion}
            width={400}
            height={164}
            viewBox="0 0 400 164"
            style={{ maxWidth: "100%", height: "auto" }}
            backgroundColor={readThemeColor("--color-surface-2")}
            foregroundColor={readThemeColor("--color-border")}
            title="Loading profile"
        >
            <circle cx="52" cy="52" r="48" />
            <rect x="0" y="116" rx="6" ry="6" width="200" height="20" />
            <rect x="0" y="146" rx="6" ry="6" width="140" height="14" />
        </ContentLoader>
    );
}
