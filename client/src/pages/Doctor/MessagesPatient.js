import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';

import { useQuery } from '@apollo/client';
import { MESSAGES } from '../../utils/queries';

function PatientMessages() {
    const { loading, data } = useQuery(MESSAGES)
    const messages = data?.messages
    console.log(messages)

    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <div>
            <h2>
                Patient Messages
            </h2>

            {messages.map(message => {
                return (
                    <div key={message}>
                        <Grid item xs={12} md={6}>
                            <CardActionArea component="a" href="#">
                                <Card sx={{ display: 'flex' }}>
                                    <CardContent sx={{ flex: 1 }}>
                                        <Typography component="h2" variant="h5">
                                            {message.patient.firstName} {message.lastName}
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary">
                                            {message.phonenumber}
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary">
                                            {message.email}
                                        </Typography>
                                        <Typography variant="subtitle1" paragraph>
                                            {message.message}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </CardActionArea>
                        </Grid>
                    </div>
                );
            })}
        </div>
    );
}

export default PatientMessages

// {/* <Grid item xs={12} md={6}>
//     <CardActionArea component="a" href="#">
//         <Card sx={{ display: 'flex' }}>
//             <CardContent sx={{ flex: 1 }}>
//                 <Typography component="h2" variant="h5">
//                     {firstName} {lastName}
//                 </Typography>
//                 <Typography variant="subtitle1" color="text.secondary">
//                     {phonenumber}
//                 </Typography>
//                 <Typography variant="subtitle1" color="text.secondary">
//                     {email}
//                 </Typography>
//                 <Typography variant="subtitle1" paragraph>
//                     {message}
//                 </Typography>
//             </CardContent>
//         </Card>
//     </CardActionArea>
// </Grid> */}

//     <div>
//         <h2>
//             Patient Messages
//         </h2>

//         {messages.map(message => {
//             return (
//                 <div key={message}>
//                     <h3>
//                         {message.patient.firstName} {message.lastName}
//                     </h3>

//                     <p>
//                         {message.message}
//                     </p>
//                 </div>
//             );
//         })}
//     </div>
//   );
// }