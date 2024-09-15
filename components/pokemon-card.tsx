import Link from "next/link";

interface PokemonCardProps {
  name: string;
}

export function PokemonCard({ name }: PokemonCardProps) {
  return (
    <>
      <Link
        key={name + "Card"}
        // href={name}
        href={`/details/${name}`}
        className="group rounded-lg border border-transparent m-3 px-5 py-4 transition-colors dark:border-gray-500 hover:border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 dark:hover:border-gray-600"
        rel="noopener noreferrer"
      >
        <h2 className="text-2xl font-semibold">
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </h2>
      </Link>
    </>
  );
}
