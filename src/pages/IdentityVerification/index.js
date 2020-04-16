import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import Card from '../../components/Card/Card.js';
import CardHeader from '../../components/Card/CardHeader.js';
import CardBody from '../../components/Card/CardBody.js';
import CardFooter from '../../components/Card/CardFooter.js';
import Button from '../../components/CustomButtons/Button.js';
import IconButton from '@material-ui/core/IconButton';
import VerifiedUser from '@material-ui/icons/VerifiedUser';
import Table from '../../components/Table/Table.js';
import usePendingIDVerifications from '../../hooks/usePendingIDVerifications';
import useUserById from '../../hooks/useUserById';
import { db } from '../../services/firebase';

const styles = {
    cardCategoryWhite: {
        color: 'rgba(255,255,255,.62)',
        margin: '0',
        fontSize: '14px',
        marginTop: '0',
        marginBottom: '0',
    },
    cardTitleWhite: {
        color: '#FFFFFF',
        marginTop: '0px',
        minHeight: 'auto',
        fontWeight: '300',
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: '3px',
        textDecoration: 'none',
    },
    image: {
        width: '100%',
    },
    cancelButton: {
        marginLeft: '16px',
        backgroundColor: '#',
    },
    tableCellMargin: {
        marginLeft: '1.7rem',
    },
    tableCellMarginIcon: {
        marginLeft: '0.5rem',
    },
    imageTitle: {
        textAlign: 'center',
        textTransform: 'none',
    },
    headerDivider: {
        borderBottom: '1px solid #9C34B3',
    },
    spacer: {
        marginTop: '3rem',
    },
};
const useStyles = makeStyles(styles);

export default function IdentityVerification() {
    const classes = useStyles();
    const { idVerifications, setReload } = usePendingIDVerifications();
    const [list, setList] = useState([]);
    const [request, setRequest] = useState({});

    useEffect(() => {
        let newList = [];
        newList = idVerifications.map((request) => {
            return [
                request.userName,
                <span className={classes.tableCellMargin}>
                    {request.userIdNumber}
                </span>,
                <IconButton
                    color='primary'
                    className={classes.tableCellMarginIcon}
                    onClick={() => handleRequestSelection(request)}
                >
                    <VerifiedUser />
                </IconButton>,
            ];
        });
        setList(newList);
    }, [idVerifications]);

    const handleRequestSelection = (request) => {
        setRequest(request);
    };

    const handleVerify = (isVerified) => {
        if (isVerified) {
            db.ref('Users').child(request.userId).update({ isVerified: true });
        } else {
            db.ref('Users').child(request.userId).remove();
        }
        db.ref('IdVerifications').child(request.id).remove();
        setReload(true);
        setRequest({});
    };

    return (
        <div>
            <GridContainer justify='center'>
                {/* Table */}
                <GridItem xs={12} sm={12} md={10}>
                    <Card>
                        <CardHeader color='primary'>
                            <h4 className={classes.cardTitleWhite}>
                                Verificaciones pendientes
                            </h4>
                            <p className={classes.cardCategoryWhite}>
                                Solicitudes para verificación de identidad
                            </p>
                        </CardHeader>
                        <CardBody>
                            {idVerifications &&
                                (idVerifications.length === 0 ? (
                                    <h5>No hay verificaciones pendientes</h5>
                                ) : (
                                    <Table
                                        tableHeaderColor='primary'
                                        tableHead={[
                                            'Nombre',
                                            'Número de identidad',
                                            'Acciones',
                                        ]}
                                        tableData={list}
                                    />
                                ))}
                        </CardBody>
                    </Card>
                </GridItem>
                {idVerifications.length !== 0 && (
                    <GridItem xs={12} sm={12} md={10}>
                        <Card>
                            <CardHeader color='primary'>
                                <h4 className={classes.cardTitleWhite}>
                                    Solicitud
                                </h4>
                                <p className={classes.cardCategoryWhite}>
                                    Imágenes del solicitante y su cédula de
                                    identidad
                                </p>
                            </CardHeader>
                            <CardBody>
                                {Object.entries(request).length === 0 ? (
                                    <h5>
                                        Por favor, seleccione una solicitud para
                                        verificar.
                                    </h5>
                                ) : (
                                    <div>
                                        <h3>
                                            {request.userName +
                                                ' - ' +
                                                request.userIdNumber}
                                        </h3>
                                        <GridContainer justify='center'>
                                            <GridItem xs={11}>
                                                <GridContainer>
                                                    <GridItem xs={12}>
                                                        <h5
                                                            className={
                                                                classes.imageTitle +
                                                                ' ' +
                                                                classes.headerDivider
                                                            }
                                                        >
                                                            Cédula de identidad
                                                        </h5>
                                                    </GridItem>
                                                    <GridItem xs={12} md={6}>
                                                        <img
                                                            className={
                                                                classes.image
                                                            }
                                                            src={
                                                                request.idFrontImage
                                                            }
                                                            alt='Imágen frontal de la cedula'
                                                        />
                                                    </GridItem>
                                                    <GridItem xs={12} md={6}>
                                                        <img
                                                            className={
                                                                classes.image
                                                            }
                                                            src={
                                                                request.idBackImage
                                                            }
                                                            alt='Imágen trasera de la cedula'
                                                        />
                                                    </GridItem>
                                                </GridContainer>
                                            </GridItem>
                                            <GridItem
                                                xs={11}
                                                className={classes.spacer}
                                            >
                                                <GridContainer justify='center'>
                                                    <GridItem xs={12}>
                                                        <h5
                                                            className={
                                                                classes.imageTitle +
                                                                ' ' +
                                                                classes.headerDivider +
                                                                ' ' +
                                                                classes.spacer
                                                            }
                                                        >
                                                            Imágen reciente del
                                                            usuario
                                                        </h5>
                                                    </GridItem>
                                                    <GridItem xs={12} md={5}>
                                                        <img
                                                            className={
                                                                classes.image
                                                            }
                                                            src={
                                                                request.recentUserImage
                                                            }
                                                            alt='Imágen reciente del usuario'
                                                        />
                                                    </GridItem>
                                                </GridContainer>
                                            </GridItem>
                                            <GridItem
                                                xs={12}
                                                className={classes.spacer}
                                            >
                                                <GridContainer justify='center'>
                                                    <Button
                                                        className={
                                                            classes.spacer
                                                        }
                                                        color='primary'
                                                        onClick={() =>
                                                            handleVerify(true)
                                                        }
                                                    >
                                                        Veriricar usuario
                                                    </Button>
                                                    <Button
                                                        className={
                                                            classes.spacer
                                                        }
                                                        onClick={() =>
                                                            handleVerify(false)
                                                        }
                                                    >
                                                        Cancelar solicitud
                                                    </Button>
                                                </GridContainer>
                                            </GridItem>
                                        </GridContainer>
                                    </div>
                                )}
                            </CardBody>
                        </Card>
                    </GridItem>
                )}
            </GridContainer>
        </div>
    );
}
