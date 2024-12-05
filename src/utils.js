export function makeDay(dayName, mainCourse = {}, addition = []) {
  return {
    dayName: dayName,
    meals: [
      {
        title: "Śniadanie",
        category: "breakfast",
        mainCourse: mainCourse,
        addition: addition,
      },
      {
        title: "2-gie śniadanie",
        category: "brunch",
        mainCourse: mainCourse,
        addition: addition,
      },
      {
        title: "Obiad",
        category: "dinner",
        mainCourse: mainCourse,
        addition: addition,
      },
      {
        title: "Podwieczorek",
        category: "snack",
        mainCourse: mainCourse,
        addition: addition,
      },
      {
        title: "Kolacja",
        category: "supper",
        mainCourse: mainCourse,
        addition: addition,
      },
    ],
  };
}
