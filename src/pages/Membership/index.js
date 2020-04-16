import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import CustomInput from '../../components/CustomInput/CustomInput.js';
import Card from '../../components/Card/Card.js';
import CardHeader from '../../components/Card/CardHeader.js';
import CardBody from '../../components/Card/CardBody.js';
import CardFooter from '../../components/Card/CardFooter.js';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DotIcon from '@material-ui/icons/FiberManualRecord';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '../../components/CustomButtons/Button.js';
import NumberFormat from 'react-number-format';
import save from '../../services/saveToFirebase';
import update from '../../services/updateToFirebase';
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
};
const useStyles = makeStyles(styles);

export default function Membership() {
    const classes = useStyles();
    const [formValues, setFormValues] = useState({
        name: '',
        price: '',
        benefit: '',
        id: '',
    });
    const [editing, setEditing] = useState(false);
    const [validForm, setValidForm] = useState(false);
    const [membershipBenefits, setMembershipBenefits] = useState([]);
    const { memberships, setReload } = useMemberships();
    const [list, setList] = useState([]);

    useEffect(() => {
        let newList = [];
        newList = memberships.map((membership) => {
            return [
                membership.name,
                <NumberFormat
                    value={membership.price}
                    thousandSeparator
                    isNumericString
                    displayType='text'
                    prefix='₡'
                ></NumberFormat>,
                <span className={classes.tableCellMargin}>
                    {membership.benefits.length}
                </span>,
                <IconButton
                    color='primary'
                    className={classes.tableCellMarginIcon}
                    onClick={() => handleEdit(membership)}
                >
                    <CreateIcon />
                </IconButton>,
            ];
        });
        setList(newList);
    }, [memberships]);

    const handleInputChange = (prop) => (event) => {
        setFormValues({ ...formValues, [prop]: event.target.value });
        setValidForm(
            formValues.name !== '' &&
                formValues.price !== '' &&
                membershipBenefits.length !== 0
                ? true
                : false
        );
    };

    const validateForm = () => {
        console.log('hello');
        setValidForm(
            formValues.name !== '' &&
                formValues.price !== '' &&
                membershipBenefits.length !== 0
                ? true
                : false
        );
    };

    const handleSubmit = () => {
        if (validForm) {
            let membership = {
                id: formValues.id,
                name: formValues.name,
                price: parseInt(formValues.price),
                benefits: membershipBenefits.map((benefit) => {
                    return benefit.name;
                }),
            };
            if (editing) {
                update('Memberships', membership);
            } else {
                save('Memberships', membership);
            }
            clearForm();
            setReload(true);
        }
    };

    const clearForm = () => {
        setFormValues({ name: '', price: '', benefit: '' });
        setMembershipBenefits([]);
        setEditing(false);
        setValidForm(false);
    };

    const handleEdit = (membership) => {
        let benefits = [];
        membership.benefits.forEach((benefit, i) => {
            benefits.push({
                name: benefit,
                id: i,
            });
        });
        setEditing(true);
        setMembershipBenefits(benefits);
        setFormValues({
            id: membership.id,
            name: membership.name,
            price: membership.price,
            benefit: '',
        });
        setValidForm(true);
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
        formValues.name !== '' && formValues.price !== '' && setValidForm(true);
    };

    const removeBenefit = (benefitId) => {
        membershipBenefits.length === 1 && setValidForm(false);
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
                                {editing ? 'Editar' : 'Crear'} membresía
                            </h4>
                            <p className={classes.cardCategoryWhite}>
                                {editing
                                    ? 'Modifique la información de la membresía'
                                    : 'Ingrese la información para una nueva membresía'}
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
                                            onBlur: () => validateForm(),
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
                                            onBlur: () => validateForm(),
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
                                                        <GridItem
                                                            xs={12}
                                                            key={
                                                                'benefit-' +
                                                                benefit.id
                                                            }
                                                        >
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
                            <GridItem xs={12}>
                                <Button
                                    color='primary'
                                    onClick={() => handleSubmit()}
                                    disabled={!validForm}
                                >
                                    {editing ? 'Modificar' : 'Crear'}
                                </Button>
                                {editing && (
                                    <Button
                                        className={classes.cancelButton}
                                        onClick={() => clearForm()}
                                    >
                                        Cancelar
                                    </Button>
                                )}
                            </GridItem>
                        </CardFooter>
                    </Card>
                </GridItem>

                {/* Table */}
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
                                    tableHead={[
                                        'Nombre',
                                        'Precio',
                                        'Beneficios',
                                        'Acciones',
                                    ]}
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
