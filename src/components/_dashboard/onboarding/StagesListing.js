import { MenuItem,Button } from "@material-ui/core"
export default function StagesListing(props){
    return(
        <MenuItem key={props.id}>
        {props.icon} {props.label}
    </MenuItem>
    )
}