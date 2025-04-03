import { useState, useRef, useEffect, ReactNode, isValidElement, ReactElement } from "react";
import { BiCaretDown } from "react-icons/bi";
// import CaretDown from "../assets/Icons/CaretDown.svg";
interface DropdownOption {
  label: string;
  value: string | number;
  icon?: string;
  disabled?: boolean;
  onClick?: any;
  description?: string;
}
interface CustomDropdownProps {
  setSearchValue?: any;
  getOptionLabel?: (option: DropdownOption) => any;
  options?: DropdownOption[] | any;
  SearchValue?: string;
  IconClass?: string;
  IconOnclick?: () => void;
  defaultValue?: DropdownOption | ReactNode | any;
  onChange?: (option: DropdownOption) => void;
  onSearch?: (searchTerm: string) => void;
  placeholder?: string;
  width?: string;
  className?: string;
  buttonClassName?: string;
  menuClassName?: string;
  optionClassName?: string;
  icon?: any;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  loading?: boolean;
  error?: string;
  customStyles?: ReactNode;
  isCustomStyles?: boolean;
  showArrow?: boolean;
  isSearchable?: boolean;
  maxHeight?: string;
  isMulti?: boolean;
  selectedValues?: DropdownOption[];
  onMultiChange?: (options: DropdownOption[]) => void;
  closeOnSelect?: boolean;
  isProfileDropdown?: boolean;
  bgTransparent?: boolean;
  lastBtn?: ReactNode;
}
const CustomDropdown = ({
  customStyles,
  lastBtn,
  setSearchValue,
  SearchValue,
  getOptionLabel,
  IconClass,
  IconOnclick,
  bgTransparent,
  isCustomStyles = false,
  options = [],
  defaultValue,
  onChange,
  onSearch,
  // placeholder = "Select option",
  width = "w-auto",
  className = "",
  buttonClassName = "",
  menuClassName = "",
  optionClassName = "",
  icon,
  iconPosition = "right",
  disabled = false,
  loading = false,
  error,
  showArrow = true,
  isSearchable = false,
  maxHeight = "max-h-[180px]",
  isMulti = false,
  selectedValues = [],
  onMultiChange,
  closeOnSelect = true,
  isProfileDropdown = false,
}: CustomDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<
    DropdownOption | undefined
  >(
    defaultValue && !isValidElement(defaultValue)
      ? (defaultValue as DropdownOption)
      : undefined
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [multiSelected, setMultiSelected] =
    useState<DropdownOption[]>(selectedValues);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState<"bottom" | "top">(
    "bottom"
  );
  const [horizontalPosition, setHorizontalPosition] = useState<
    "left" | "right"
  >("left");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && buttonRef.current && menuRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const menuHeight = menuRef.current.offsetHeight;
      const menuWidth = menuRef.current.offsetWidth;
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;

      // Check vertical space
      const spaceBelow = windowHeight - buttonRect.bottom;
      const spaceAbove = buttonRect.top;

      // Check horizontal space
      const spaceRight = windowWidth - buttonRect.left;
      const spaceLeft = buttonRect.right;

      // Set vertical position
      if (spaceBelow < menuHeight && spaceAbove > spaceBelow) {
        setDropdownPosition("top");
      } else {
        setDropdownPosition("bottom");
      }

      // Set horizontal position
      if (spaceRight < menuWidth && spaceLeft > menuWidth) {
        setHorizontalPosition("right");
      } else {
        setHorizontalPosition("left");
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (defaultValue && !isValidElement(defaultValue)) {
      setSelectedOption(defaultValue as DropdownOption);
    }
  }, [defaultValue]);

  const handleOptionClick = (option: DropdownOption) => {

    if (option.disabled) return;
    getOptionLabel && getOptionLabel(option);
    
    // getOptionLabel((option: any) => option);
    option.onClick;
    if (isMulti) {
      const isSelected = multiSelected.some(
        (item) => item.value === option.value
      );
      let newSelected;
      if (isSelected) {
        newSelected = multiSelected.filter(
          (item) => item.value !== option.value
        );
      } else {
        newSelected = [...multiSelected, option];
      }
      setMultiSelected(newSelected);
      onMultiChange?.(newSelected);
      if (closeOnSelect) {
        setIsOpen(false);
        setSearchTerm("");
      }
    } else {
      setSelectedOption(option);
      setIsOpen(false);
      setSearchTerm("");
      onChange?.(option);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch?.(value);
  };

  const filteredOptions = options.filter((option : any) =>
    option?.label?.toLowerCase()?.includes(SearchValue ? SearchValue?.toLocaleLowerCase() :searchTerm?.toLowerCase())
  );

  const baseButtonClasses = `
    flex items-center justify-between
   grow
    ${isProfileDropdown ? "p-0" : "px-4 py-2.5"} rounded-lg
    ${isProfileDropdown ? "" : "border border-[#E5E7EB]"}
    ${bgTransparent || "bg-white"}
    font-poppins text-[14px] leading-[21px]
    transition-colors duration-200
    ${
      disabled
        ? "opacity-50 cursor-not-allowed"
        : "hover:border-[#D1D5DB] cursor-pointer"
    }
    ${error ? "border-red-500" : ""}
    ${buttonClassName}
  `;

  const baseMenuClasses = `
    absolute
    mt-3 py-1
    bg-white
    border border-[#E5E7EB]
    rounded-lg shadow-lg
    whitespace-nowrap
    z-50
    overflow-hidden
    min-w-auto
    ${maxHeight}
    ${menuClassName}
  `;

  const baseOptionClasses = `px-[16px] py-[12px] bg-white border-b flex items-center gap-2 font-poppins text-[14px] leading-[21px] text-black ${optionClassName}`;

  return (
    <div
      ref={dropdownRef}
      className={`relative flex justify-center ${width} ${className}`}
    >
      <button
        ref={buttonRef}
        className={baseButtonClasses}
        onClick={() => {
          !disabled && setIsOpen(!isOpen);
        }}
        disabled={disabled}
        type="button"
      >
        {isProfileDropdown ? (
          isValidElement(defaultValue) ? (
            defaultValue
          ) : null
        ) : (
          <div className="flex items-center gap-2  flex-1 min-w-0">
            {icon && iconPosition === "left" && (
              <img src={icon} alt="" className="w-4 h-4 flex-shrink-0" />
            )}
            <span className="text-[#9F9F9F] text-[16px]">
              {selectedOption?.label || defaultValue}
            </span>
            {icon && iconPosition === "right" && (
              <img src={icon} alt="" className="w-4 h-4 flex-shrink-0" />
            )}
          </div>
        )}
        {showArrow && (
          <div
            className={`w-4 h-4 ml-2 flex-shrink-0 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              // class="feather feather-chevron-down"
            >
              <path d="M6 9l6 6 6-6" fill="none" stroke="gray" />
            </svg>
          </div>
        )}
      </button>

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}

      {isOpen && !disabled && !loading && (
        <div
          ref={menuRef}
          className={`
            ${baseMenuClasses}
            ${dropdownPosition === "top" ? "bottom-full mb-1" : "top-full mt-1"}
            ${horizontalPosition === "right" ? "right-0" : "left-0"}
          
          `}
        >
          {lastBtn && lastBtn}
          {isSearchable && (
            <div className="px-3 py-2 border-b border-[#E5E7EB] w-full">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search..."
                className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:border-[#2D3F50]"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
          <div
            className="overflow-y-auto scroll-container"
            style={{ maxHeight: "180px" }}
          >
            <div className="">
              {isCustomStyles ? (
                customStyles
              ) : filteredOptions.length > 0 ? (
                filteredOptions.map((option: any, index: number) => (
                  <div
                    key={index}
                    className={` ${baseOptionClasses} ${
                      option.disabled
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }
                    ${
                      isMulti &&
                      multiSelected.some((item) => item.value === option.value)
                        ? "bg-gray-100"
                        : ""
                    }
                  `}
                    onClick={() => {
                      setSearchValue && setSearchValue(option.value);
                      if (!option.disabled) {
                        handleOptionClick(option);
                        if (typeof option.onClick === "function") {
                          option.onClick();
                        }
                      }
                    }}
                  >
                    {/* {isMulti && (
                      <input
                        type="checkbox"
                        checked={multiSelected.some(
                          (item) => item.value === option.value
                        )}
                        onChange={() => {}}
                        className="mr-2"
                      />
                    )} */}

                    {option.icon && (
                      // <span className="text-lg">{option.icon}</span>
                      <img
                        src={option.icon?.src}
                        alt=""
                        className={IconClass}
                        onClick={() => (IconOnclick ? IconOnclick : undefined)}
                      />
                    )}
                    <div className="flex flex-col">
                      <span className="text-black">{option.label}</span>
                      {option.description && (
                        <span className="text-xs text-[#8C8C8C]">
                          {option.description}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-sm text-[#8C8C8C]">
                  No options found
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-[--secondary] border-t-transparent"></div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
// 
                  // <CustomDropdown
                  //   closeOnSelect={true}
                  //   getOptionLabel={(option: any) => {
                  //     setGraduationYear(option.label);
                  //     return option.label;
                  //   }}
                  //   width="w-[126px]"
                  //   className="w-[126px] h-[40px]"
                  //   menuClassName="w-[126px] text-center"
                  //   options={Array.from({ length: 26 }, (_, i) => {
                  //     const year = 2025 - i;
                  //     return { value: year.toString(), label: year.toString() };
                  //   })}
                  //   defaultValue={
                  //     graduationYear
                  //       ? { value: graduationYear, label: graduationYear }
                  //       : { value: "", label: "--Year--" }
                  //   }
                  // />
                
