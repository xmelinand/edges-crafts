export function dateFormat(date) {
    const days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    const day = days[date.getDay()] 

	return (`${day} ` + ('0' + date.getDate()).slice(-2) + '/'
    + ('0' + (date.getMonth()+1)).slice(-2) + '/'
    + date.getFullYear())
}

// returns "dayOfTheWeek DD/MM/YYYY"
