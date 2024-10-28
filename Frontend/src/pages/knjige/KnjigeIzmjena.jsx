import SmjerService from "../../services/KnjigaService"
import { Button, Row, Col, Form } from "react-bootstrap";
import moment from "moment";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import { useEffect, useState } from "react";


export default function KnjigePromjena() {

    const [knjiga, setSKnjiga] = useState({})
    const navigate = useNavigate()
    const routeParams = useParams()

    async function dohvatiKnjigu() {
        const odgovor = await SmjerService.getBySifra(routeParams.sifra);
        console.log(odgovor, routeParams)
        if (odgovor.greska) {
            alert(odgovor.poruka)
            return
        }
        //debugger; // ovo radi u Chrome inspect (ali i ostali preglednici)
        let s = odgovor.poruka
        s.availableFrom = moment.utc(s.availableFrom).format('yyyy-MM-DD')
        setSKnjiga(s)
    }

    useEffect(() => {
        dohvatiKnjigu();
    }, [])


    const [zanrovi, setZanrovi] = useState([])
    const [selectedZanr, setSelectedZanr] = useState('')

    async function dohvatiZanrove() {
        const odgovor = await SmjerService.getZanrovi();
        if (odgovor) {
            console.log('zanrovi', odgovor)
            setZanrovi(odgovor.poruka)
            return
        }
        //debugger; // ovo radi u Chrome inspect (ali i ostali preglednici)
        // setZanrovi(odgovor)
    }

    // Ovaj hook (kuka) se izvodi dolaskom na stranicu Smjerovi
    useEffect(() => {
        dohvatiZanrove();
    }, [])

    async function promjena(knjiga) {
        //console.log(smjer)
        //console.log(JSON.stringify(smjer))
        const odgovor = await SmjerService.promjena(routeParams.sifra, knjiga)
        if (odgovor.greska) {
            alert(odgovor.poruka)
            return;
        }
        navigate(RouteNames.HOME)
    }

    function obradiSubmit(e) { // e je event
        e.preventDefault(); // nemoj odraditi zahtjev na server
        let podaci = new FormData(e.target)
        //console.log(podaci.get('naziv'))
        promjena({
            name: podaci.get('naziv'),
            publishYear: parseInt(podaci.get('godinaIzdavanja')),
            price: parseFloat(podaci.get('cijena')),
            availableFrom: moment.utc(podaci.get('dostupnoOd')),
            genreId: selectedZanr.id || zanrovi[0].id,
            isAvailableDigitally: true
        })
    }

    const handleSelectChange = (event) => {
        const selectedId = parseInt(event.target.value, 10);
        const selectedObject = zanrovi.find((zanr) => zanr.id === selectedId);
        setSelectedZanr(selectedObject); // Postavi odabrani objekt u state
    };


    return (
        <>
            Promjena knjige
            <Form onSubmit={obradiSubmit}>

                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control type="text" name="naziv" required
                        defaultValue={knjiga.name} />
                </Form.Group>

                <Form.Group controlId="godinaIzdavanja">
                    <Form.Label>Godina izdavanja</Form.Label>
                    <Form.Control type="number" min={1800} max={2024} name="godinaIzdavanja" required defaultValue={knjiga.publishYear} />
                </Form.Group>


                <Form.Group controlId="cijena">
                    <Form.Label>Cijena</Form.Label>
                    <Form.Control type="number" step={0.01} name="cijena" defaultValue={knjiga.price} />
                </Form.Group>

                <Form.Group controlId="dostupnoOd">
                    <Form.Label>Dostupno od</Form.Label>
                    <Form.Control type="date" step={0.01} name="dostupnoOd" defaultValue={knjiga.availableFrom} />
                </Form.Group>

                <Form.Group controlId="zanr" value={selectedZanr} onChange={handleSelectChange}>
                    <Form.Label>Žanr</Form.Label>

                    <Form.Select aria-label="Žanr" defaultValue={zanrovi[0]?.id}>
                        {zanrovi?.map((zanr) => (
                            <option key={zanr.id} value={zanr.id}>
                                {zanr.name}
                            </option >
                        ))}
                    </Form.Select>
                </Form.Group>

                {/* <Form.Group controlId="vaucer">
                <Form.Check label="Vaučer" name="vaucer" defaultChecked={smjer.vaucer} />
            </Form.Group> */}

                <Row className="akcije">
                    <Col xs={6} sm={12} md={3} lg={6} xl={6} xxl={6}>
                        <Link to={RouteNames.HOME}
                            className="btn btn-danger siroko">Odustani</Link>
                    </Col>
                    <Col xs={6} sm={12} md={9} lg={6} xl={6} xxl={6}>
                        <Button variant="success"
                            type="submit"
                            className="siroko">Promjeni smjer</Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}