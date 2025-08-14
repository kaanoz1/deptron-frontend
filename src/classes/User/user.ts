"use client";
export type UserDTO = {
    id: string;
    username: string;
    email: string;
    name: string;
    surname: string;
    image: string | null;
};

export class User {
    constructor(
        private id: string,
        private username: string,
        private email: string,
        private name: string,
        private surname: string,
        private image: string | null,
    ) {}

    static createFromJSON(data: UserDTO): User {
        const { id, username, email, name, surname, image } = data;
        return new User(id, username, email, name, surname, image);
    }

    getId(): string {
        return this.id;
    }

    setId(id: string): void {
        this.id = id;
    }

    getUsername(): string {
        return this.username;
    }

    setUsername(username: string): void {
        this.username = username;
    }

    getEmail(): string {
        return this.email;
    }

    setEmail(email: string): void {
        this.email = email;
    }

    getName(): string {
        return this.name;
    }

    setName(name: string): void {
        this.name = name;
    }

    getSurname(): string {
        return this.surname;
    }

    setSurname(surname: string): void {
        this.surname = surname;
    }

    getFallbackName(): string {
        return `${this.name.at(0) ?? ""}${this.surname?.at(0) ?? ""}`.trim();
    }

    getImage(): string | null {
        return this.image;
    }

    getImageUrl(): string | undefined {
        return this.image ? `data:image/jpeg;base64,${this.image}` : undefined;
    }

    setImage(image: string | null): void {
        this.image = image;
    }
}

export type UserMeDTO = {
    id: string;
    username: string;
    email: string;
    name: string;
    surname: string | null;
    image: string | null;
    roles: string[];
};

export class UserMe {
    constructor(
        private id: string,
        private username: string,
        private email: string,
        private name: string,
        private surname: string | null,
        private image: string | null,
        private roles: string[],
    ) {}

    static createFromJSON(data: UserMeDTO): UserMe {
        const { id, username, email, name, surname, image, roles } = data;
        return new UserMe(id, username, email, name, surname, image, roles);
    }

    getId(): string {
        return this.id;
    }

    setId(id: string): void {
        this.id = id;
    }

    getUsername(): string {
        return this.username;
    }

    setUsername(username: string): void {
        this.username = username;
    }

    getEmail(): string {
        return this.email;
    }

    setEmail(email: string): void {
        this.email = email;
    }

    getName(): string {
        return this.name;
    }

    getImageUrl(): string | undefined {
        return this.image ? `data:image/jpeg;base64,${this.image}` : undefined;
    }

    getComposedName(): string {
        return `${this.name} ${this.surname}`.trim();
    }

    getFallbackName(): string {
        return `${this.name.at(0) ?? ""}${this.surname?.at(0) ?? ""}`.trim();
    }

    setName(name: string): void {
        this.name = name;
    }

    getSurname(): string | null {
        return this.surname;
    }

    setSurname(surname: string): void {
        this.surname = surname;
    }

    getImage(): string | null {
        return this.image;
    }

    setImage(image: string | null): void {
        this.image = image;
    }

    getRoles(): string[] {
        return this.roles;
    }

    getClone(): UserMe {
        const id = this.getId();
        const username = this.getUsername();
        const email = this.getEmail();
        const surname = this.getSurname();
        const image = this.getImage();
        const name = this.getName();
        const roles = this.getRoles();

        return new UserMe(id, username, email, name, surname, image, roles);
    }

    static getClone(data: UserMe) {
        const id = data.getId();
        const username = data.getUsername();
        const email = data.getEmail();
        const surname = data.getSurname();
        const image = data.getImage();
        const name = data.getName();
        const roles = data.getRoles();

        return new UserMe(id, username, email, name, surname, image, roles);
    }
}

export type UserPublicDTO = {
    name: string;
    surname: string;
    image: string | null;
};

export class UserPublic {
    constructor(
        private name: string,
        private surname: string,
        private image: string | null,
    ) {}

    static createFromJSON(data: UserPublicDTO): UserPublic {
        const { name, surname, image } = data;
        return new UserPublic(name, surname, image);
    }

    getName(): string {
        return this.name;
    }

    setName(name: string): void {
        this.name = name;
    }

    getSurname(): string {
        return this.surname;
    }

    setSurname(surname: string): void {
        this.surname = surname;
    }

    getImage(): string | null {
        return this.image;
    }

    setImage(image: string | null): void {
        this.image = image;
    }
}
