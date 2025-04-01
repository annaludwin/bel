export function makeDay(dayName, mainCourse = {}, addition = []) {
  return {
    dayName: dayName,
    meals: [
      {
        title: "Śniadanie",
        category: "breakfast",
        mainCourse: {
          calories: "222",
          ingredients: ["dcfsd", "ghgh"],
          recipe: ["cdsd", "vfgbfgbf"],
          title: "nazwa",
        },
        addition: { calories: "", ingredients: [], recipe: [], title: "" },
      },
      {
        title: "2-gie śniadanie",
        category: "brunch",
        mainCourse: { calories: "", ingredients: [], recipe: [], title: "" },
        addition: { calories: "", ingredients: [], recipe: [], title: "" },
      },
      {
        title: "Obiad",
        category: "dinner",
        mainCourse: { calories: "", ingredients: [], recipe: [], title: "" },
        addition: { calories: "", ingredients: [], recipe: [], title: "" },
      },
      {
        title: "Podwieczorek",
        category: "snack",
        mainCourse: { calories: "", ingredients: [], recipe: [], title: "" },
        addition: { calories: "", ingredients: [], recipe: [], title: "" },
      },
      {
        title: "Kolacja",
        category: "supper",
        mainCourse: { calories: "", ingredients: [], recipe: [], title: "" },
        addition: { calories: "", ingredients: [], recipe: [], title: "" },
      },
    ],
  };
}
