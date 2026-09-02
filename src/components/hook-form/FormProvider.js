import PropTypes from "prop-types";
import { FormProvider as RHFFormProvider } from "react-hook-form";


FormProvider.propTypes = {
    children: PropTypes.node.isRequired,
    methods: PropTypes.object.isRequired,
    onSubmit: PropTypes.func,
}


export default function FormProvider({ children, methods, onSubmit,className }) {
    return (

        <RHFFormProvider {...methods}>
            <form onSubmit={onSubmit} className={className}>
                {children}
            </form>
        </RHFFormProvider>
       
    )
}