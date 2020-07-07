const Client = require('../model/client.js');

exports.getAddClient = (req, res, next) => {
    res.render('client/add_update', {
        pageTitle: 'Crear Clientes',
        path: '/add-client',
        editing: true,
        editMode: false,
    });
};

exports.postAddClient = (req, res, next) => {
    const name = req.body.name;
    const lastName = req.body.lastName;
    const phone = req.body.phone;
    const email = req.body.email;

    const client = new Client({
        name: name,
        lastName: lastName,
        phone: phone,
        email: email
    }).save().then((result) => console.log('Cliente Creado')).catch((err) => console.error);
    res.redirect('/clients');
};

exports.getClients = (req, res, next) => {
    Client.find()
        .then(clients => {
            const number = [];
            for (let i = 0; i < clients.length; i++) {
                number.push(i+1);
            }
            res.render('client/clients', {
                clients: clients,
                editing: false,
                hasClients: clients.length > 0,
                number: number
                // helpers: {
                //  number: function () {
                //    const number = [];
                //    for (let i =0; i < clients.length;i++){
                //      number.push(i);
                //     }
                //    return number;
                //  }
                // }
            });

        }).catch(err => console.log(err));

};

exports.getEditClient = (req, res, next) => {

    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const clId = req.params.clientId;
    Client.findById(clId).then(client => {
        if (!client) {
            console.log(client);
            return res.redirect('/');
        }
        res.render('client/add_update', {
            path: '/admin/edit-client',
            editing: true,
            editMode: editMode,
            client: client,

        })
    }).catch(err => {
        console.log(err)
    });
};

exports.postEditClient = (req, res) => {
    const UpdateClientId = req.body.clientId;
    const UpdateName = req.body.name;
    const UpdateLastName = req.body.lastName;
    const UpdatePhone = req.body.phone;
    const UpdateEmail = req.body.email;

    Client.findOneAndUpdate(UpdateClientId, {
        name: UpdateName,
        lastName: UpdateLastName,
        phone: UpdatePhone,
        email: UpdateEmail
    }).then(result => res.redirect('/clients')).catch(error => console.log(error));

};

exports.postDeleteClient = (req, res) => {
    const DeleteClientId = req.body.clientId;
//   const DeleteClientId = req.params.clientId;
    console.log(DeleteClientId);
    Client.findOneAndDelete(DeleteClientId)
        .then(
            result => {
                (console.log('Cliente Deleted'));
                res.redirect('clients')
            })
        .catch(error => console.log((error)));
};