import { useState } from "react";
import type { FormEvent } from "react";

import { DASHBOARD_COPY, INCIDENT_QUERY_CONFIG } from "../config/ui.config";

interface SearchFormProps {
  isSubmitting: boolean;
  onSearch: (query: string) => Promise<void>;
}

export default function SearchForm({
  isSubmitting,
  onSearch,
}: SearchFormProps) {
  const [query, setQuery] = useState("");

  const trimmedQuery = query.trim();
  
  const isQueryTooShort =
    trimmedQuery.length > 0 &&
    trimmedQuery.length < INCIDENT_QUERY_CONFIG.MIN_LENGTH;
  const isSubmitDisabled =
    isSubmitting || trimmedQuery.length < INCIDENT_QUERY_CONFIG.MIN_LENGTH;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (trimmedQuery.length < INCIDENT_QUERY_CONFIG.MIN_LENGTH) {
      return;
    }

    await onSearch(trimmedQuery);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <h2 className="mb-3 text-xl font-semibold">
        {DASHBOARD_COPY.search.title}
      </h2>

      <textarea
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={DASHBOARD_COPY.search.placeholder}
        disabled={isSubmitting}
        className="h-32 w-full resize-none rounded-lg bg-zinc-950 p-3 text-white outline-none disabled:cursor-not-allowed disabled:opacity-60"
      />

      {isQueryTooShort ? (
        <p className="mt-2 text-sm text-yellow-400">
          {DASHBOARD_COPY.search.minLengthMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitDisabled}
        className="mt-4 rounded-lg bg-white px-4 py-2 text-black disabled:cursor-not-allowed disabled:opacity-60">
        {
          isSubmitting
            ? DASHBOARD_COPY.search.buttonLoading
            : DASHBOARD_COPY.search.buttonIdle
        }
      </button>
    </form>
  );
}