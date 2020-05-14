class HeaderDate {
    constructor() {
        // Classe helper para tratar o objeto Date.
        this.date = new Date();

        this.options = {
            weekday: "long",
            month: "short",
            day: "numeric",
        };
    }

    convertDate() {
        // Converte a string em pt-BR
        this.date = this.date.toLocaleDateString("pt-BR", this.options);
    }

    upperCase() {
        // Converte a primeira letra da string em maiúscula
        this.convertDate();
        this.date = this.date.charAt(0).toUpperCase() + this.date.slice(1);
    }

    render(element) {
        // Renderiza a string em um elemento da página
        this.upperCase();
        element.innerHTML = this.date;
    }
}