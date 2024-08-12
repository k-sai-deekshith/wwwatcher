import React, { useEffect, useState } from 'react';
import { Drawer, Box, Typography, Divider, Accordion, AccordionSummary, AccordionDetails, Checkbox, FormControlLabel, RadioGroup, Radio, Slider, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ProductList from './main';

const filters = [
    {
        label: 'Brand',
        options: ['Fossil', 'Timex', 'Movado', 'Daniel Wellington', 'Armitron'],
    },
    {
        label: 'Case Shape',
        options: ['Round', 'Square', 'Rectangle', 'Oval'],
    },
];

const waterResistanceOptions = ['Yes', 'No', 'Doesn’t matter'];

const FilterDrawer: React.FC<{ search: string }> = ({ search }) => {
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedCaseShapes, setSelectedCaseShapes] = useState<string[]>([]);
    const [waterResistance, setWaterResistance] = useState<string>('Doesn’t matter');
    const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
    const [searchText, setSearchText] = useState<string>('');
    const [filterObject, setFilterObject] = useState<{
            brands?: string[];
            caseShapes?: string[];
            waterResistance?: boolean;
            minPrice?: number;
            maxPrice?: number;
    }>({});

    const showResultsClicked = () => {
        const filterSelection:any  = {}
        if(selectedBrands.length !==0){
            filterSelection.brands = selectedBrands;
        }
        if(selectedCaseShapes.length!==0){
            filterSelection.caseShapes = selectedCaseShapes;
        }
        if(waterResistance === 'Yes'){
            filterSelection.waterResistance = true;
        }else if (waterResistance === 'No'){
            filterSelection.waterResistance = false;
        }
        filterSelection.minPrice = priceRange[0];
        filterSelection.maxPrice = priceRange[1];
        filterSelection.searchText = search;
        console.log(filterSelection);
        setFilterObject(filterSelection);
    }

    useEffect(() => { showResultsClicked(); setSearchText(search) }, [search])

    const handleBrandChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSelectedBrands(prev =>
            prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
        );
    };

    const handleCaseShapeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSelectedCaseShapes(prev =>
            prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
        );
    };

    const handleWaterResistanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWaterResistance(event.target.value);
    };

    const handlePriceChange = (event: Event, newValue: number | number[]) => {
        setPriceRange(newValue as number[]);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer
                variant="permanent"
                anchor="left"
                sx={{
                    width: 300,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: 250,
                        boxSizing: 'border-box',
                        marginTop: '125px',
                        height: 'calc(100vh - 125px)',
                    },
                }}
            >
                <Box sx={{ padding: 2, overflow: 'auto' }}>
                    <Typography variant="h6" sx={{ marginBottom: 2 }}>
                        Filters
                    </Typography>
                    <Divider />

                    <Accordion defaultExpanded>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Brand</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {filters[0].options.map(brand => (
                                <FormControlLabel
                                    key={brand}
                                    control={
                                        <Checkbox
                                            checked={selectedBrands.includes(brand)}
                                            onChange={handleBrandChange}
                                            value={brand}
                                        />
                                    }
                                    label={brand}
                                />
                            ))}
                        </AccordionDetails>
                    </Accordion>
                    <Divider />

                    <Accordion defaultExpanded>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Case Shape</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {filters[1].options.map(shape => (
                                <FormControlLabel
                                    key={shape}
                                    control={
                                        <Checkbox
                                            checked={selectedCaseShapes.includes(shape)}
                                            onChange={handleCaseShapeChange}
                                            value={shape}
                                        />
                                    }
                                    label={shape}
                                />
                            ))}
                        </AccordionDetails>
                    </Accordion>
                    <Divider />

                    <Accordion defaultExpanded>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Water Resistance</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <RadioGroup
                                value={waterResistance}
                                onChange={handleWaterResistanceChange}
                            >
                                {waterResistanceOptions.map(option => (
                                    <FormControlLabel
                                        key={option}
                                        value={option}
                                        control={<Radio />}
                                        label={option}
                                    />
                                ))}
                            </RadioGroup>
                        </AccordionDetails>
                    </Accordion>
                    <Divider />
                    <Accordion defaultExpanded>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Price</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Slider
                                value={priceRange}
                                onChange={handlePriceChange}
                                valueLabelDisplay="auto"
                                min={10}
                                max={1000}
                            />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Box>
                                    <Typography variant="caption">From, $</Typography>
                                    <Typography variant="body1">{priceRange[0]}</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="caption">To, $</Typography>
                                    <Typography variant="body1">{priceRange[1]}</Typography>
                                </Box>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                    <Divider />
                    <Box sx={{ position: 'sticky', bottom: 0 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ padding: 2 }}
                            onClick={showResultsClicked}
                        >
                            Show Results
                        </Button>
                    </Box>
                </Box>
            </Drawer>
            <Box
                sx={{
                    flexGrow: 1,
                }}
            >
                <ProductList search={searchText} filterObject={filterObject}/>
            </Box>
        </Box>
    );
};

export default FilterDrawer;
