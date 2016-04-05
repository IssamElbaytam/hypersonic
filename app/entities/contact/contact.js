import editLayout from './layouts/contact.edit';

export default {
    name: "contact",
    displayNameSingular: "Contact",
    displayNamePlural: "Contacts",
    fields: [
        {
            name: "name",
            type: "string",
            displayName: "Name",
            help: "Name should have 10 or less characters",
            invalid: [
                {
                    condition: function (m) {
                        return m.name && m.name.length > 10;
                    },
                    message: 'Name is too big.'
                }
            ]
        },
        {
            name: "email",
            type: "string",
            displayName: "E-mail"
        }
    ],
    layouts: [editLayout],
    clientActions: [
        {
            name: 'delete',
            displayName: 'Delete',
            icon: 'trash',
            invoke: (s, c) => {
                console.log(s);
                console.log(c);
            }
        }
    ],
    search: function (criteria, page, layoutName, context) {
        return context.repository.helpers.paginate(function() { return this.where('name', 'like', `%${criteria}%`) }, page);
    }
};