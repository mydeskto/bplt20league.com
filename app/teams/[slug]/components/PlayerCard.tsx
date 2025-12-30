import Link from 'next/link';

interface PlayerCardProps {
    player: {
        name: string;
        image?: string;
        role?: string;
        country?: string;
    };
}

export default function PlayerCard({ player }: PlayerCardProps) {
    return (
        <div
            className="block group relative bg-slate-900/50 backdrop-blur-sm rounded-xl border border-[#d4a574]/20 p-4 transition-all duration-300 hover:scale-105 hover:border-[#d4a574]/60 hover:shadow-lg hover:shadow-[#d4a574]/20 hover:bg-slate-800/60"
        >
            <div className="relative w-full aspect-[4/4] mb-4 rounded-lg overflow-hidden">
                <img
                    src={player.image || "/placeholder.svg"}
                    alt={player.name}
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="text-center">
                <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-[#d4a574] transition-colors duration-300">
                    {player.name}
                </h3>
                <p className="text-gray-400 text-xs group-hover:text-[#d4a574] transition-colors duration-300">
                    {player.role}
                </p>
                <p className="text-gray-400 text-xs group-hover:text-[#d4a574] transition-colors duration-300">
                    {player.country || "N/A"}
                </p>
            </div>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#d4a574]/0 via-[#d4a574]/5 to-[#d4a574]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
    );
}