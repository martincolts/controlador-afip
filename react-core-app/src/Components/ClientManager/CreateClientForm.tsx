import * as React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Client } from "../../model/client";
import { Box, Button, Stack, TextField } from "@mui/material";
import useCreateClient from "../../Hooks/QueryHooks/useCreateClient";

interface CreateClientFormProps {
  handleClose: () => void
}

const CreateClientForm: React.FC<CreateClientFormProps> = ({ handleClose }) => {
  const createClient = useCreateClient()
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Client>();
  const onSubmit: SubmitHandler<Client> = async (data: Client) => {
    try {
      await createClient.mutateAsync(data)
      reset()
      handleClose()
     } catch (e) {
        console.log(e) // show toast
      }
    
  }

  return (
    <Box >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction={"column"} spacing={1}>
          <Controller
            name="firstName"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                error={!!errors.firstName}
                {...field}
                id="outlined-basic"
                label="Nombre"
                variant="outlined"
                helperText="este campo es requerido"
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                error={!!errors.lastName}
                {...field}
                id="outlined-basic"
                label="Apellido"
                variant="outlined"
                helperText="este campo es requerido"
              />
            )}
          />
          <Controller
            name="cuit"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                error={!!errors.cuit}
                {...field}
                id="outlined-basic"
                label="CUIT CUIL"
                variant="outlined"
                helperText="este campo es requerido"
              />
            )}
          />
          <Controller
            name="dni"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                error={!!errors.dni}
                {...field}
                id="outlined-basic"
                label="DNI"
                variant="outlined"
                helperText="este campo es requerido"
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                error={!!errors.phone}
                {...field}
                id="outlined-basic"
                label="Telefono"
                variant="outlined"
                helperText="este campo es requerido"
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                error={!!errors.email}
                {...field}
                id="outlined-basic"
                label="Email"
                variant="outlined"
                helperText="este campo es requerido"
              />
            )}
          />
          <Button type="submit" variant="contained">
            Agregar
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default CreateClientForm;
