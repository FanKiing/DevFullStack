import React, { useState, useEffect } from 'react';
import { useVeloStore } from './VeloContext';

conste ListeBatteries = () => {
    const {store} = useVeloStore();