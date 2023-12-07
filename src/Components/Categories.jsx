import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
// import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

// const categories = [
//   { name: "Heath", color: "#ffdf3d" },
//   { name: "Education", color: "#ff8e24" },
//   { name: "Persional", color: "#e843fe" },
//   { name: "Family", color: "#1fff44" },
//   { name: "Work", color: "#248eff" },
// ];

const categories = [
  {
    name: "Heath",
    color: "#4942E4",
    bg: "#190482",
    border: "#4942E4",
    text: "#C4B0FF",
  },
  {
    name: "Education",
    color: "#ff9a3c",
    bg: "#ffc93c",
    border: "#ff6f3c",
    text: "#155263",
  },
  {
    name: "Persional",
    color: "#5b70f3",
    bg: "#80ffdb",
    border: "#55e0a3",
    text: "#4850b9",
  },
  {
    name: "Family",
    color: "#3C79F5",
    bg: "#6C00FF",
    border: "#2DCDDF",
    text: "#F2DEBA",
  },
  {
    name: "Work",
    color: "#176B87",
    bg: "#04364A",
    border: "#64CCC5",
    text: "#DAFFFB",
  },
];

export default function Categories({ selected, onCategoryChange }) {
  const [selectedCategory, setSelectedCategory] = useState(selected);
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onCategoryChange(category);
  };
  return (
    <div className="w-full h-auto ">
      <Listbox value={selectedCategory} onChange={handleCategoryChange}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selected?.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              {/* <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              /> */}
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 h-24 overflow-y-scroll w-full  rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {categories.map((category, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  // className={({ active }) =>
                  //   `relative cursor-default select-none py-2 pl-10 pr-4 bg-[${
                  //     category.color
                  //   }] ${
                  //     active
                  //       ? `bg-[${category.color}] text-amber-900`
                  //       : "text-gray-900"
                  //   }`
                  // }

                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10  pr-4  ${
                      active ? `bg-[#5B69FF] text-white` : "text-gray-900"
                    }`
                  }
                  value={category}
                >
                  {/* {console.log(category.color)} */}

                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate  overflow-auto${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {category.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          {/* <CheckIcon className="h-5 w-5" aria-hidden="true" /> */}
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
