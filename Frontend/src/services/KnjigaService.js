import { HttpService } from "./HttpService";



async function get() {
    return await HttpService.get('/Book')
        .then((odgovor) => {
            //console.log(odgovor.data)
            //console.table(odgovor.data)
            console.log(odgovor.data)

            return { greska: false, poruka: odgovor.data }
        })
        .catch((e) => {
            //console.log(e)
            return { greska: true, poruka: 'Problem kod dohvaćanja knjiga' }
        })
}

async function brisanje(sifra) {
    return await HttpService.delete('/Book/' + sifra)
        .then(() => {
            return { greska: false, poruka: 'Obrisano' }
        })
        .catch(() => {
            return { greska: true, poruka: 'Problem kod brisanja knjiga' }
        })
}

async function dodaj(knjiga) {
    return await HttpService.post('/Book', knjiga)
        .then(() => {
            return { greska: false, poruka: 'Dodano' }
        })
        .catch(() => {
            return { greska: true, poruka: 'Problem kod dodavanja knjige' }
        })
}

async function promjena(sifra, knjiga) {
    return await HttpService.put('/Book/' + sifra, knjiga)
        .then(() => {
            return { greska: false, poruka: 'Dodano' }
        })
        .catch(() => {
            return { greska: true, poruka: 'Problem kod dodavanja smjera' }
        })
}

async function getBySifra(sifra) {
    return await HttpService.get('/Book/' + sifra)
        .then((knjiga) => {
            return { greska: false, poruka: knjiga.data }
        })
        .catch(() => {
            return { greska: true, poruka: 'Problem kod dodavanja smjera' }
        })
}

async function getZanrovi() {
    return await HttpService.get('/Genre')
        .then((odgovor) => {
            //console.log(odgovor.data)
            //console.table(odgovor.data)
            console.log(odgovor.data)

            return { greska: false, poruka: odgovor.data }
        })
        .catch((e) => {
            //console.log(e)
            return { greska: true, poruka: 'Problem kod dohvaćanja knjiga' }
        })
}


export default {
    get,
    brisanje,
    dodaj,
    promjena,
    getZanrovi,
    getBySifra
}
