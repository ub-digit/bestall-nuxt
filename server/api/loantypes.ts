export default defineEventHandler(async (event) => {
  let { locale } = getQuery(event) as { locale?: string };

  if (!locale) {
    locale = "sv"; // if missing add default locale
  }

  console.log(`Fetching loan types for locale: ${locale}`);

  const originalLoanTypes = [
    {
      id: 5,
      show_pickup_location: false,
      name_sv: "Skicka materialet till mig",
      name_en: "Send the material to me",
    },
    {
      id: 1,
      show_pickup_location: true,
      name_sv: "Hämta materialet i biblioteket (hemlån)",
      name_en: "Pick up the material at the library (home loan)",
    },
    {
      id: 2,
      show_pickup_location: true,
      name_sv: "Läs materialet i biblioteket (läsesalslån)",
      name_en: "Read the material in the library (reading room loan)",
    },
    {
      id: 3,
      show_pickup_location: true,
      name_sv: "Forskarskåp (tillstånd krävs)",
      name_en: "Loan to researcher’s locker (permit required)",
    },
    {
      id: 4,
      show_pickup_location: true,
      name_sv: "Institutionslån (tillstånd krävs)",
      name_en: "Loan to department (permit required)",
    },
  ];

  // Extend original loan types with a localized name property
  const extendedLoanTypes = originalLoanTypes.map((loanType) => ({
    ...loanType,
    name: locale === "sv" ? loanType.name_sv : loanType.name_en,
  }));

  try {
    return extendedLoanTypes;
  } catch (error) {
    console.error("Error fetching loan types:", error);
  }
});
