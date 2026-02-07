import { Check, X } from "lucide-react"

interface ComparisonFeature {
    name: string
    imagetourl: boolean | string
    imgur: boolean | string
    googlePhotos: boolean | string
    imgbb: boolean | string
}

interface ComparisonTableSectionProps {
    title: string
    subtitle: string
}

const comparisonData: ComparisonFeature[] = [
    { name: "Free to use", imagetourl: true, imgur: true, googlePhotos: true, imgbb: true },
    { name: "No signup required", imagetourl: true, imgur: false, googlePhotos: false, imgbb: true },
    { name: "Max file size", imagetourl: "10MB", imgur: "20MB", googlePhotos: "200MB", imgbb: "32MB" },
    { name: "Direct image URL", imagetourl: true, imgur: true, googlePhotos: false, imgbb: true },
    { name: "Global CDN", imagetourl: true, imgur: true, googlePhotos: true, imgbb: false },
    { name: "Custom expiry time", imagetourl: true, imgur: false, googlePhotos: false, imgbb: false },
    { name: "No compression", imagetourl: true, imgur: false, googlePhotos: false, imgbb: true },
    { name: "Ad-free experience", imagetourl: true, imgur: false, googlePhotos: true, imgbb: false },
    { name: "API access", imagetourl: true, imgur: true, googlePhotos: true, imgbb: true },
    { name: "SVG support", imagetourl: true, imgur: false, googlePhotos: false, imgbb: false },
]

function FeatureCell({ value }: { value: boolean | string }) {
    if (typeof value === "string") {
        return <span className="text-zinc-300 text-sm font-medium">{value}</span>
    }
    return value ? (
        <Check className="w-5 h-5 text-green-400 mx-auto" />
    ) : (
        <X className="w-5 h-5 text-zinc-600 mx-auto" />
    )
}

export function ComparisonTableSection({ title, subtitle }: ComparisonTableSectionProps) {
    return (
        <section className="w-full max-w-5xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">
                    {title}
                </h2>
                <p className="text-zinc-400 text-sm md:text-base max-w-lg mx-auto">
                    {subtitle}
                </p>
            </div>

            <div className="overflow-x-auto">
                <div className="inline-block min-w-full">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="px-4 md:px-6 py-4 text-zinc-400 font-medium text-xs uppercase tracking-wider">
                                        Feature
                                    </th>
                                    <th className="px-4 md:px-6 py-4 text-center">
                                        <div className="flex flex-col items-center gap-1">
                                            <span className="text-brand font-semibold text-sm">ImageToURL</span>
                                            <span className="text-xs text-zinc-500">You are here</span>
                                        </div>
                                    </th>
                                    <th className="px-4 md:px-6 py-4 text-zinc-400 font-medium text-sm text-center">
                                        Imgur
                                    </th>
                                    <th className="px-4 md:px-6 py-4 text-zinc-400 font-medium text-sm text-center">
                                        Google Photos
                                    </th>
                                    <th className="px-4 md:px-6 py-4 text-zinc-400 font-medium text-sm text-center">
                                        Imgbb
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonData.map((feature, index) => (
                                    <tr
                                        key={feature.name}
                                        className={`border-b border-white/5 transition-colors hover:bg-white/[0.03] ${index === comparisonData.length - 1 ? "border-b-0" : ""
                                            }`}
                                    >
                                        <td className="px-4 md:px-6 py-4 text-zinc-300 text-sm font-medium">
                                            {feature.name}
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-center bg-brand/5">
                                            <FeatureCell value={feature.imagetourl} />
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-center">
                                            <FeatureCell value={feature.imgur} />
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-center">
                                            <FeatureCell value={feature.googlePhotos} />
                                        </td>
                                        <td className="px-4 md:px-6 py-4 text-center">
                                            <FeatureCell value={feature.imgbb} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <p className="text-center text-zinc-500 text-xs mt-4">
                Feature comparison as of 2026. Subject to change based on competitor updates.
            </p>
        </section>
    )
}
