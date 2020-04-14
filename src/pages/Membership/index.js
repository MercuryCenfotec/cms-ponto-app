import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import CustomInput from '../../components/CustomInput/CustomInput.js';
import Card from '../../components/Card/Card.js';
import CardHeader from '../../components/Card/CardHeader.js';
import CardBody from '../../components/Card/CardBody.js';
import CardFooter from '../../components/Card/CardFooter.js';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import DotIcon from '@material-ui/icons/FiberManualRecord';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '../../components/CustomButtons/Button.js';
import NumberFormat from 'react-number-format';
import save from '../../services/saveToFirebase';
import useMemberships from '../../hooks/useMemberships.js';
import Table from '../../components/Table/Table.js';

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
            prefix='₡'
        />
    );
}

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
    addBenefitButton: {
        marginTop: '32px',
        width: '142px',
    },
    benefitListDot: {
        color: '#9A32B1',
    },
    benefitListDelete: {
        color: '#ff0000',
        marginRight: '5px',
    },
    benefit: {
        color: '#888',
    },
};
const useStyles = makeStyles(styles);

export default function Membership() {
    const classes = useStyles();
    const [formValues, setFormValues] = useState({
        name: '',
        price: '',
        benefit: '',
    });
    const [validForm, setValidForm] = useState(true);
    const [membershipBenefits, setMembershipBenefits] = useState([]);
    const { memberships, setReload } = useMemberships();
    const [list, setList] = useState([]);
    useEffect(() => {
        let newList = [];
        newList = memberships.map((membership) => {
            return [
                membership.name,
                membership.price,
                <CreateIcon onClick={() => handleEdit(membership)} />,
            ];
        });
        setList(newList);
    }, [memberships]);

    console.log(memberships);
    const handleInputChange = (prop) => (event) => {
        setFormValues({ ...formValues, [prop]: event.target.value });
    };

    const handleSubmit = () => {
        if (validForm) {
            let membership = {
                name: formValues.name,
                price: formValues.price,
                benefits: membershipBenefits.map((benefit) => {
                    return benefit.name;
                }),
            };
            save('Memberships', membership);
            setFormValues({ name: '', price: '', benefit: '' });
            setMembershipBenefits([]);
            setReload(true);
        }
    };

    const handleEdit = (membership) => {
        console.log(membership);
    };

    const addBenefit = () => {
        if (formValues.benefit !== '') {
            setMembershipBenefits([
                ...membershipBenefits,
                {
                    name: formValues.benefit,
                    id:
                        membershipBenefits.length === 0
                            ? membershipBenefits.length
                            : membershipBenefits[membershipBenefits.length - 1]
                                  .id + 1,
                },
            ]);
            setFormValues({ ...formValues, benefit: '' });
        }
    };

    const removeBenefit = (benefitId) => {
        setMembershipBenefits(
            membershipBenefits.filter((benefit) => benefit.id !== benefitId)
        );
    };

    return (
        <div>
            <GridContainer justify='center'>
                <GridItem xs={12} sm={12} md={10}>
                    <Card>
                        <CardHeader color='primary'>
                            <h4 className={classes.cardTitleWhite}>
                                Crear membresía
                            </h4>
                            <p className={classes.cardCategoryWhite}>
                                Ingrese la información para una nueva membresía
                            </p>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12}>
                                    <h3>Información</h3>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput
                                        labelText='Nombre'
                                        id='name'
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            value: formValues.name,
                                            onChange: handleInputChange('name'),
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput
                                        labelText='Precio'
                                        id='price'
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            value: formValues.price,
                                            onChange: handleInputChange(
                                                'price'
                                            ),
                                            inputComponent: NumberFormatCustom,
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12}>
                                    <h3>Beneficios</h3>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12}>
                                    <GridContainer>
                                        <GridItem md={10}>
                                            <CustomInput
                                                labelText='Beneficio'
                                                id='benefit'
                                                formControlProps={{
                                                    fullWidth: true,
                                                }}
                                                inputProps={{
                                                    value: formValues.benefit,
                                                    onChange: handleInputChange(
                                                        'benefit'
                                                    ),
                                                }}
                                            />
                                        </GridItem>
                                        <GridItem md={2}>
                                            <Button
                                                className={
                                                    classes.addBenefitButton
                                                }
                                                onClick={() => addBenefit()}
                                            >
                                                <AddIcon /> Agregar
                                            </Button>
                                        </GridItem>
                                    </GridContainer>
                                </GridItem>
                                <GridItem xs={12}>
                                    {membershipBenefits.length === 0 ? (
                                        <GridContainer>
                                            <GridItem xs={12}>
                                                No hay beneficios agregados.
                                            </GridItem>
                                        </GridContainer>
                                    ) : (
                                        <GridContainer>
                                            {membershipBenefits.map(
                                                (benefit) => {
                                                    return (
                                                        <GridItem xs={12}>
                                                            <GridContainer>
                                                                <GridItem
                                                                    xs={1}
                                                                >
                                                                    <DeleteIcon
                                                                        className={
                                                                            classes.benefitListDelete
                                                                        }
                                                                        onClick={() =>
                                                                            removeBenefit(
                                                                                benefit.id
                                                                            )
                                                                        }
                                                                    />
                                                                    <DotIcon
                                                                        className={
                                                                            classes.benefitListDot
                                                                        }
                                                                    />
                                                                </GridItem>
                                                                <GridItem
                                                                    xs={11}
                                                                >
                                                                    <span
                                                                        className={
                                                                            classes.benefit
                                                                        }
                                                                    >
                                                                        {
                                                                            benefit.name
                                                                        }
                                                                    </span>
                                                                </GridItem>
                                                            </GridContainer>
                                                        </GridItem>
                                                    );
                                                }
                                            )}
                                        </GridContainer>
                                    )}
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                        <CardFooter>
                            <GridItem xs={1} sm={1} md={1}>
                                <Button
                                    color='primary'
                                    onClick={() => handleSubmit()}
                                >
                                    Crear
                                </Button>
                            </GridItem>
                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={10}>
                    <Card>
                        <CardHeader color='primary'>
                            <h4 className={classes.cardTitleWhite}>
                                Membresías
                            </h4>
                            <p className={classes.cardCategoryWhite}>
                                Membresías existentes de Ponto
                            </p>
                        </CardHeader>
                        <CardBody>
                            {memberships && (
                                <Table
                                    tableHeaderColor='primary'
                                    tableHead={['Nombre', 'Precio', 'Acciones']}
                                    tableData={list}
                                />
                            )}
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}
