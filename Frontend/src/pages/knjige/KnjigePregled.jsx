import { useEffect, useState } from "react"
import SmjerService from "../../services/KnjigaService"
import { Button, Table } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import moment from "moment";
import { GrValidate } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";


export default function KnjigePregled() {

    const navigate = useNavigate()

    const [knjige, setKnjige] = useState();

    // useEffect(() => {
    //     setKnjige([{ id: 1, name: 'Pustolovine mladog mornara', publishYear: 1967,price:19.20, avaliableFrom: '1967-1-1', genre:'Horor' }])
    // }, [])


    async function dohvatiKnjige() {
        console.log('bilo sta')
        const odgovor = await SmjerService.get();
        if (odgovor) {
            console.log(odgovor)
            setKnjige(odgovor.poruka)
            return
        }
        //debugger; // ovo radi u Chrome inspect (ali i ostali preglednici)
        // setSmjerovi(odgovor.poruka)
    }

    // Ovaj hook (kuka) se izvodi dolaskom na stranicu Smjerovi
    useEffect(() => {
        dohvatiKnjige();
    }, [])

    function formatirajDatum(datum) {
        if (datum == null) {
            return 'Nije definirano';
        }
        return moment.utc(datum).format('DD. MM. YYYY.')
    }

    function vaucer(v) {
        if (v == null) return 'gray'
        if (v) return 'green'
        return 'red'
    }

    function obrisi(sifra) {
        if (!confirm('Sigurno obrisati')) {
            return;
        }
        brisanjeKnjige(sifra)
    }

    async function brisanjeKnjige(sifra) {

        const odgovor = await SmjerService.brisanje(sifra);
        if (odgovor.greska) {
            alert(odgovor.poruka)
            return
        }
        dohvatiKnjige();
    }


    return (
        <>
            <Link to={RouteNames.SMJER_NOVI}
                className="btn btn-success siroko">Dodaj novu knjigu</Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Godina izdavanja</th>
                        <th>Cijena</th>
                        <th>Dostupno od</th>
                        <th>Žanr</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {knjige && knjige.map((knjiga, index) => (
                        <tr key={index}>
                            <td>
                                {knjiga.name}
                            </td>
                            <td>
                                {knjiga.publishYear}
                            </td>
                            <td>
                                {knjiga.price}
                            </td>
                            <td>
                                {knjiga.availableFrom}
                            </td>
                            <td>
                                {knjiga.genre.name}
                            </td>
                       
                            {/* <td className="sredina">
                                {formatirajDatum(knjiga.izvodiSeOd)}
                            </td> */}
                            {/* <td className="sredina">
                                <GrValidate
                                    size={30}
                                    color={vaucer(knjiga.vaucer)}
                                />

                            </td> */}
                            <td>
                                <Button
                                    variant="danger"
                                    onClick={() => obrisi(knjiga.id)}
                                >
                                    Obriši
                                </Button>
                                &nbsp;&nbsp;&nbsp;
                                <Button
                                    onClick={() => navigate(`/knjige/${knjiga.id}`)}
                                >
                                    Promjena
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}