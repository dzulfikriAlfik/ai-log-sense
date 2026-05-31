import { useState } from "react";

interface SearchFormProps {
  onSearch: (query: string) => Promise<void>;
}

export default function SearchForm({ onSearch }: SearchFormProps) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!query.trim()) {
      return;
    }

    setLoading(true);

    await onSearch(query);

    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <textarea
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Describe your incident..."
        className="h-32 w-full resize-none rounded-lg bg-zinc-950 p-3 text-white outline-none"
      />

      <button
        disabled={loading}
        className="mt-4 rounded-lg bg-white px-4 py-2 text-black">
        {loading ? "Analyzing..." : "Analyze Incident"}
      </button>
    </form>
  );
}
