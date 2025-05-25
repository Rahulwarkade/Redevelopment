import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getCountries } from "@/store/user/userAPI";
import { Country } from "@/types/custom";
import { Container } from "../common";

interface Props {
  value?: Country | null;
  onChange: (country: Country) => void;
  disabled? : boolean;
}

const normalize = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const CountrySelect: React.FC<Props> = ({ value, onChange,disabled }) => {
  const dispatch = useAppDispatch();
  const countries = useAppSelector((state) => state.country.countries);
  const loading = useAppSelector((state) => state.country.loading);

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  useEffect(() => {
    if (!value && countries.length > 0) {
      const india = countries.find(
        (c) => c.code === "IN" || normalize(c.name) === "india"
      );
      if (india) onChange(india);
    }
  }, [countries, value, onChange]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCountries = countries.filter((country) => {
    const normalizedSearch = normalize(search);
    return (
      normalize(country.name).includes(normalizedSearch) ||
      country.code.toLowerCase().includes(normalizedSearch) ||
      country.phoneCode.includes(normalizedSearch)
    );
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredCountries.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredCountries.length - 1
      );
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault();
      onChange(filteredCountries[highlightedIndex]);
      setOpen(false);
      setSearch("");
      setHighlightedIndex(-1);
    }
  };

  return (
    <section
      className="relative w-full h-[56px] translate-y-5 z-50"
      ref={dropdownRef}
    >
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        className="w-full h-full border border-[#DEDEDE] rounded px-2 py-2 flex items-center justify-between"
        onClick={() => {
          setOpen((prev) => !prev);
          setTimeout(() => inputRef.current?.focus(), 0);
        }}
        disabled={loading}
      >
        {value ? (
          <span className="flex items-center gap-2">
            <span>{value.flagEmoji || "🌐"}</span>
            <span>{value.name}</span>
            <span className="text-gray-500">+{value.phoneCode}</span>
          </span>
        ) : (
          <span className="text-gray-400">
            {loading ? "Loading..." : "Select country"}
          </span>
        )}
        <span className="ml-2">&#9662;</span>
      </button>

      {open && (
        <section
          className="absolute w-full bg-white border rounded shadow mt-1 max-h-60 overflow-y-auto z-50"
          role="listbox"
          tabIndex={-1}
          onKeyDown={handleKeyDown}
        >
          <Container className="sticky top-0 bg-white p-2 border-b">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search country"
              className="w-full border rounded px-2 py-1"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setHighlightedIndex(0);
              }}
              autoFocus
              aria-label="Search countries"
              disabled={disabled}
            />
          </Container>

          {loading && (
            <div className="p-2 text-gray-400 text-center">Loading...</div>
          )}

          {!loading && filteredCountries.length === 0 && (
            <Container className="p-2 text-gray-400 text-center">
              No countries found
            </Container>
          )}

          {filteredCountries.map((country, index) => {
            const isHighlighted = index === highlightedIndex;
            const isSelected = value && value._id === country._id;

            return (
              <Container
                key={country._id}
                className={`flex items-center gap-2 px-2 py-2 cursor-pointer ${
                  isHighlighted
                    ? "bg-blue-100"
                    : isSelected
                    ? "bg-blue-50"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => {
                  onChange(country);
                  setOpen(false);
                  setSearch("");
                  setHighlightedIndex(-1);
                }}
                // role="option"
                aria-selected={isSelected}
              >
                <span>{country.flagEmoji || "🌐"}</span>
                <span>{country.name}</span>
                <span className="text-gray-500">+{country.phoneCode}</span>
              </Container>
            );
          })}
        </section>
      )}
    </section>
  );
};

export default CountrySelect;
