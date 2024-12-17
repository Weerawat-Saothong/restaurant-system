// utils/isMobile.ts
export const isMobileOrTablet = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth <= 1024; // Adjust width to include tablets
    }
    return false;
  };
  