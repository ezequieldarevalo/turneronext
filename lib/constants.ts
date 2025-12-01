import HeaderRevitotal from "components/layout/structure/HeaderRevitotal";

export const AUTO='AUTO PARTICULAR';
export const MOTO_CHICA='MOTO HASTA 300 CC';
export const MOTO_GRANDE='MOTO MAS DE 300 CC';
export const CAMIONETA='CAMIONETA PARTICULAR';

// Nombres específicos para plantas lasheras y maipu
export const AUTO_LASHERAS_MAIPU='AUTOMOVIL';
export const CAMIONETA_LASHERAS_MAIPU='CAMIONETA/SUV/UTILITARIO';

export const vehicleTypeList = [
    AUTO,
    MOTO_CHICA,
    MOTO_GRANDE,
    CAMIONETA
];

export const vehicleTypeListLasherasMaipu = [
    AUTO_LASHERAS_MAIPU,
    MOTO_CHICA,
    MOTO_GRANDE,
    CAMIONETA_LASHERAS_MAIPU
];



export const fuelTypeList = [
    'NAFTA',
    'DIESEL',
    'GAS',
];

export const PLANTS=[
    {id: 'lasheras', available: true},
    {id: 'maipu', available: true},
    // {id: 'rivadavia', available: true},
    {id: 'godoycruz', available: true},
    // {id: 'sanmartin', available: true},
];