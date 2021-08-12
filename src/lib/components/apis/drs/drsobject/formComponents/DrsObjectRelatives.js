import React from 'react';
import { 
    Typography,
    FormControl,
    TextField,
    Grid,
    FormGroup,
    InputAdornment,
    Tooltip,
    Button
} from '@material-ui/core';
import {
    Link
} from 'react-router-dom';
import { scrollToTop } from '../../../../functions/common';
import SpaceDivider from '../../../../common/SpaceDivider';
import RemoveItemButton from '../../../../common/RemoveItemButton';
import VerifyIdButton from './VerifyIdButton';
import AddItemButton from '../../../../common/AddItemButton';

/*
    Related DRS Objects include DRS Object Children and DRS Object Parents, each
    of which can be added or removed. The ID of the related DRS Object is
    entered in the text field. If the ID is valid, the name field is
    automatically populated by clicking the "Verify" button.
*/
const DrsObjectRelatives = props => {
    return (
        <FormGroup>
            <SpaceDivider />
            <Typography align='left' variant='h6'>{props.header}</Typography>
            {props.sectionDescription}
            {props.relatives.map((relative, index) => {
                return (
                    <FormGroup key={`${props.relationship}-${index}`} row>
                        <Grid container alignItems='center' spacing={4}>
                            <Grid item xs> 
                                <FormControl fullWidth>
                                    <TextField
                                        fullWidth
                                        variant='outlined'
                                        id={`ID_${props.relationship}${index}`} 
                                        label='Id'
                                        aria-label={`ID_${props.relationship}${index}`}
                                        name={relative.id}
                                        value={relative.id}
                                        margin='normal'
                                        type='text'
                                        onChange={e => {
                                            props.setRelativeId(index, e.target.value);
                                            props.unsetRelativeValidity(index);
                                        }}
                                        InputProps={props.readOnly
                                            ?
                                                {readOnly: props.readOnly}
                                            :
                                                {
                                                    readOnly: props.readOnly,
                                                    endAdornment:
                                                        <InputAdornment position='end'>
                                                            <VerifyIdButton
                                                                activeDrsObject={props.activeDrsObject}
                                                                activeDrsObjectId={props.activeDrsObjectId}
                                                                relative={relative}
                                                                setRelativeName={(name) => props.setRelativeName(index, name)}
                                                                setRelativeValid={() => props.setRelativeValid(index)}
                                                                setRelativeInvalid={() => props.setRelativeInvalid(index)}
                                                                retrieveDrsObject={props.retrieveDrsObject}
                                                                customApiCallSuccessCallback={props.customApiCallSuccessCallback ? responseData => props.customApiCallSuccessCallback(index, responseData) : undefined}
                                                                readOnly={props.readOnly}
                                                                formViewType={props.formViewType}
                                                            />
                                                        </InputAdornment>
                                                }
                                        }
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs>
                                <FormControl fullWidth>
                                    <TextField variant='outlined' fullWidth id={`Name_${props.relationship}${index}`} 
                                    label='Name' margin='normal' name={relative.name} type='text' 
                                    aria-label={`Name_${props.relationship}${index}`}
                                    value={relative.name} InputProps={{readOnly: true}}/>                            
                                </FormControl>
                            </Grid>
                            {props.readOnly
                                ?
                                    <Grid item xs={1}>
                                        <Tooltip
                                            title={`View DrsObject with id '${relative.id}'`}
                                        >
                                            <Button
                                                aria-label='view-relative'
                                                variant='contained'
                                                component={Link}
                                                to={`/drs/${relative.id}`}
                                                onClick={scrollToTop}
                                                color='primary'
                                            >
                                                <Typography variant='button'>View</Typography>
                                            </Button>
                                        </Tooltip>    
                                    </Grid>
                                : null

                            }

                            <RemoveItemButton
                                display={!props.readOnly}
                                objectName={props.objectName}
                                handleClick={() => props.removeRelative(index)}
                            />
                        </Grid>
                    </FormGroup>
                )
            })}
            <AddItemButton
                objectName={props.objectName}
                display={!props.readOnly}
                disabled={props.readOnly}
                handleClick={props.addRelative}
            />
        </FormGroup>
    )
}

export default DrsObjectRelatives;
