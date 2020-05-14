class HeaderDate {
    constructor() {
        this.date = new Date();

        this.options = {
            weekday: "long",
            month: "short",
            day: "numeric",
        };
    }

    convertDate() {
        this.date = this.date.toLocaleDateString("pt-BR", this.options);
    }

    upperCase() {
        this.convertDate();
        this.date = this.date.charAt(0).toUpperCase() + this.date.slice(1);
    }

    render(element) {
        this.upperCase();
        element.innerHTML = this.date;
    }
}