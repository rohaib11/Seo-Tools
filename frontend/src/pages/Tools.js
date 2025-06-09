import React, { useState } from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, Tabs, Tab, Container } from '@mui/material';
import {
  AccessTime as TimeIcon,
  Speed as SpeedIcon,
  Straighten as LengthIcon,
  Scale as WeightIcon,
  Thermostat as TempIcon,
  Storage as ByteIcon,
  CompareArrows as VoltageIcon,
  AreaChart as AreaIcon,
  Bolt as PowerIcon,
  Opacity as VolumeIcon,
  Settings as TorqueIcon,
  Compress as PressureIcon,
  Code as BinaryIcon,
  TextFields as TextIcon,
  Functions as MathIcon,
  Calculate as CalcIcon,
  Person as PersonIcon,
  Percent as PercentIcon,
  TrendingUp as TrendIcon,
  Receipt as ReceiptIcon,
  Paid as PaidIcon,
  AttachMoney as MoneyIcon,
  LocalAtm as AtmIcon,
  FitnessCenter as FitnessIcon,
  School as SchoolIcon,
  Fastfood as FoodIcon,
  Work as WorkIcon,
  Savings as SavingsIcon,
  Image as ImageIcon,
  GridView as GridIcon,
  PhotoCamera as PhotoCameraIcon,
  Crop as CropIcon,
  Palette as PaletteIcon,
  Loop as LoopIcon,
  Filter as FilterIcon,
  Compress as CompressIcon,
  Animation as AnimationIcon,
  Lock as LockIcon,
  LockOpen as LockOpenIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

const Tools = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const categories = [
    {
      name: 'Unit Converters',
      tools: [
        { name: 'Time Converter', icon: <TimeIcon />, path: '/unit-converter/time' },
        { name: 'Speed Converter', icon: <SpeedIcon />, path: '/unit-converter/speed' },
        { name: 'Length Converter', icon: <LengthIcon />, path: '/unit-converter/length' },
        { name: 'Weight Converter', icon: <WeightIcon />, path: '/unit-converter/weight' },
        { name: 'Temperature Converter', icon: <TempIcon />, path: '/unit-converter/temperature' },
        { name: 'Byte Converter', icon: <ByteIcon />, path: '/unit-converter/byte' },
        { name: 'Voltage Converter', icon: <VoltageIcon />, path: '/unit-converter/voltage' },
        { name: 'Area Converter', icon: <AreaIcon />, path: '/unit-converter/area' },
        { name: 'Power Converter', icon: <PowerIcon />, path: '/unit-converter/power' },
        { name: 'Volume Converter', icon: <VolumeIcon />, path: '/unit-converter/volume' },
        { name: 'Torque Converter', icon: <TorqueIcon />, path: '/unit-converter/torque' },
        { name: 'Pressure Converter', icon: <PressureIcon />, path: '/unit-converter/pressure' }
      ]
    },
    {
      name: 'Binary Converters',
      tools: [
        { name: 'Text to Binary', icon: <BinaryIcon />, path: '/binary-converter/text-to-binary' },
        { name: 'Binary to Text', icon: <TextIcon />, path: '/binary-converter/binary-to-text' },
        { name: 'Binary to HEX', icon: <MathIcon />, path: '/binary-converter/binary-to-hex' },
        { name: 'HEX to Binary', icon: <BinaryIcon />, path: '/binary-converter/hex-to-binary' },
        { name: 'Binary to Decimal', icon: <MathIcon />, path: '/binary-converter/binary-to-decimal' },
        { name: 'Decimal to Binary', icon: <BinaryIcon />, path: '/binary-converter/decimal-to-binary' },
        { name: 'Text to ASCII', icon: <TextIcon />, path: '/binary-converter/text-to-ascii' },
        { name: 'Binary to ASCII', icon: <BinaryIcon />, path: '/binary-converter/binary-to-ascii' },
        { name: 'ASCII to Binary', icon: <TextIcon />, path: '/binary-converter/ascii-to-binary' },
        { name: 'Decimal to HEX', icon: <MathIcon />, path: '/binary-converter/decimal-to-hex' },
        { name: 'Binary Translator', icon: <TextIcon />, path: '/binary-converter/binary-translator' },
        { name: 'English to Binary', icon: <TextIcon />, path: '/binary-converter/english-to-binary' },
        { name: 'Binary to English', icon: <BinaryIcon />, path: '/binary-converter/binary-to-english' },
        { name: 'Binary Decoder', icon: <BinaryIcon />, path: '/binary-converter/binary-decoder' },
        { name: 'HEX to Text', icon: <TextIcon />, path: '/binary-converter/hex-to-text' }
      ]
    },
    {
      name: 'Online Calculators',
      tools: [
        { name: 'Age Calculator', icon: <PersonIcon />, path: '/online-calculators/age' },
        { name: 'Percentage Calculator', icon: <PercentIcon />, path: '/online-calculators/percentage' },
        { name: 'Average Calculator', icon: <CalcIcon />, path: '/online-calculators/average' },
        { name: 'Confidence Interval', icon: <TrendIcon />, path: '/online-calculators/confidence-interval' },
        { name: 'Sales Tax Calculator', icon: <ReceiptIcon />, path: '/online-calculators/sales-tax' },
        { name: 'Margin Calculator', icon: <PaidIcon />, path: '/online-calculators/margin' },
        { name: 'Probability Calculator', icon: <CalcIcon />, path: '/online-calculators/probability' },
        { name: 'Paypal Fee Calculator', icon: <MoneyIcon />, path: '/online-calculators/paypal-fee' },
        { name: 'Discount Calculator', icon: <AtmIcon />, path: '/online-calculators/discount' },
        { name: 'Earnings Per Share', icon: <MoneyIcon />, path: '/online-calculators/earnings-per-share' },
        { name: 'CPM Calculator', icon: <MoneyIcon />, path: '/online-calculators/cpm' },
        { name: 'Loan to Value', icon: <MoneyIcon />, path: '/online-calculators/loan-to-value' },
        { name: 'GST Calculator', icon: <ReceiptIcon />, path: '/online-calculators/gst' },
        { name: 'BMI Calculator', icon: <FitnessIcon />, path: '/online-calculators/bmi' },
        { name: 'Chronological Age', icon: <PersonIcon />, path: '/online-calculators/chronological-age' },
        { name: 'Hours Calculator', icon: <TimeIcon />, path: '/online-calculators/hours' },
        { name: 'Grade Calculator', icon: <SchoolIcon />, path: '/online-calculators/grade' },
        { name: 'GPA Calculator', icon: <SchoolIcon />, path: '/online-calculators/gpa' },
        { name: 'Percentage Increase', icon: <TrendIcon />, path: '/online-calculators/percentage-increase' },
        { name: 'Percentage Decrease', icon: <TrendIcon />, path: '/online-calculators/percentage-decrease' },
        { name: 'Percentage Change', icon: <TrendIcon />, path: '/online-calculators/percentage-change' },
        { name: 'Percentage Difference', icon: <TrendIcon />, path: '/online-calculators/percentage-difference' },
        { name: 'Calorie Calculator', icon: <FoodIcon />, path: '/online-calculators/calorie' },
        { name: 'Salary Calculator', icon: <WorkIcon />, path: '/online-calculators/salary' },
        { name: 'Investment Calculator', icon: <SavingsIcon />, path: '/online-calculators/investment' },
        { name: 'TDEE Calculator', icon: <FitnessIcon />, path: '/online-calculators/tdee' },
        { name: 'Mean Median Mode', icon: <CalcIcon />, path: '/online-calculators/mean-median-mode' }
      ]
    },
    {
      name: 'Image Editing Tools',
      tools: [
        { name: 'Reverse Image Search', icon: <ImageIcon />, path: '/image-editing-tools/reverse-image-search' },
        { name: 'Face Search', icon: <ImageIcon />, path: '/image-editing-tools/face-search' },
        { name: 'Image Compressor', icon: <CompressIcon />, path: '/image-editing-tools/image-compressor' },
        { name: 'Favicon Generator', icon: <GridIcon />, path: '/image-editing-tools/favicon-generator' },
        { name: 'Video to GIF', icon: <AnimationIcon />, path: '/image-editing-tools/video-to-gif-converter' },
        { name: 'Image Resizer', icon: <ImageIcon />, path: '/image-editing-tools/image-resizer' },
        { name: 'Photo Resizer (KB)', icon: <PhotoCameraIcon />, path: '/image-editing-tools/photo-resizer-in-kb' },
        { name: 'Crop Image', icon: <CropIcon />, path: '/image-editing-tools/crop-image' },
        { name: 'Convert to JPG', icon: <ImageIcon />, path: '/image-editing-tools/convert-to-jpg' },
        { name: 'RGB to Hex', icon: <PaletteIcon />, path: '/image-editing-tools/rgb-to-hex' },
        { name: 'PNG to JPG', icon: <ImageIcon />, path: '/image-editing-tools/png-to-jpg' },
        { name: 'JPG to PNG', icon: <ImageIcon />, path: '/image-editing-tools/jpg-to-png' },
        { name: 'Compress to 50KB', icon: <CompressIcon />, path: '/image-editing-tools/compress-image-to-50kb' },
        { name: 'Compress to 200KB', icon: <CompressIcon />, path: '/image-editing-tools/compress-image-to-200kb' },
        { name: 'Compress JPEG (100KB)', icon: <CompressIcon />, path: '/image-editing-tools/compress-jpeg-to-100kb' },
        { name: 'Compress JPEG (200KB)', icon: <CompressIcon />, path: '/image-editing-tools/compress-jpeg-to-200kb' },
        { name: 'Compress JPG', icon: <CompressIcon />, path: '/image-editing-tools/compress-jpg' },
        { name: 'Resize to 50KB', icon: <ImageIcon />, path: '/image-editing-tools/resize-image-to-50kb' },
        { name: 'Compress PNG', icon: <CompressIcon />, path: '/image-editing-tools/compress-png' },
        { name: 'Compress to 10KB', icon: <CompressIcon />, path: '/image-editing-tools/compress-image-to-10kb' },
        { name: 'Compress to 30KB', icon: <CompressIcon />, path: '/image-editing-tools/compress-image-to-30kb' },
        { name: 'Compress to 1MB', icon: <CompressIcon />, path: '/image-editing-tools/compress-image-to-1mb' },
        { name: 'MB to KB Converter', icon: <LoopIcon />, path: '/image-editing-tools/mb-to-kb-converter' },
        { name: 'MP4 to GIF', icon: <AnimationIcon />, path: '/image-editing-tools/mp4-to-gif-converter' },
        { name: 'HEIC to JPG', icon: <ImageIcon />, path: '/image-editing-tools/heic-to-jpg-converter' },
        { name: 'HEIC to PNG', icon: <ImageIcon />, path: '/image-editing-tools/heic-to-png' },
        { name: 'SVG Converter', icon: <FilterIcon />, path: '/image-editing-tools/svg-converter' },
        { name: 'PNG to SVG', icon: <FilterIcon />, path: '/image-editing-tools/png-to-svg' },
        { name: 'JPG to SVG', icon: <FilterIcon />, path: '/image-editing-tools/jpg-to-svg' },
        { name: 'JPEG to SVG', icon: <FilterIcon />, path: '/image-editing-tools/jpeg-to-svg' },
        { name: 'WEBP to PNG', icon: <ImageIcon />, path: '/image-editing-tools/webp-to-png' },
        { name: 'SVG to PNG', icon: <ImageIcon />, path: '/image-editing-tools/svg-to-png' },
        { name: 'PNG to ICO', icon: <GridIcon />, path: '/image-editing-tools/png-to-ico' },
        { name: 'AVIF to JPG', icon: <ImageIcon />, path: '/image-editing-tools/avif-to-jpg' },
        { name: 'JPEG Optimizer', icon: <CompressIcon />, path: '/image-editing-tools/jpeg-optimizer' }
      ]
    },

    {
  name: 'PDF Tools',
  tools: [
    { name: 'Merge PDFs', icon: <LoopIcon />, path: '/pdf-tools/merge' },
    { name: 'Rotate PDF', icon: <LoopIcon />, path: '/pdf-tools/rotate' },
    { name: 'Unlock PDF', icon: <LockOpenIcon />, path: '/pdf-tools/unlock' },
    { name: 'Lock PDF', icon: <LockIcon />, path: '/pdf-tools/lock' },
    { name: 'Add Watermark', icon: <PaletteIcon />, path: '/pdf-tools/watermark' },
    { name: 'PDF to Word', icon: <TextIcon />, path: '/pdf-tools/pdf-to-word' },
    { name: 'Word to PDF', icon: <TextIcon />, path: '/pdf-tools/word-to-pdf' },
    { name: 'PDF to JPG', icon: <ImageIcon />, path: '/pdf-tools/pdf-to-jpg' },
    { name: 'JPG to PDF', icon: <ImageIcon />, path: '/pdf-tools/jpg-to-pdf' },
    { name: 'PPT to PDF', icon: <GridIcon />, path: '/pdf-tools/ppt-to-pdf' },
    { name: 'Compress PDF', icon: <CompressIcon />, path: '/pdf-tools/compress' },
    { name: 'Split PDF', icon: <FilterIcon />, path: '/pdf-tools/split' },
    { name: 'Resize PDF', icon: <CropIcon />, path: '/pdf-tools/resize' },
    { name: 'Delete PDF Pages', icon: <DeleteIcon />, path: '/pdf-tools/delete-pages' },
    { name: 'Excel to PDF', icon: <GridIcon />, path: '/pdf-tools/excel-to-pdf' }
  ]
}

  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
        SEO Tools Collection
      </Typography>
      
      <Tabs 
        value={tabValue} 
        onChange={handleTabChange} 
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 4 }}
      >
        {categories.map((category, index) => (
          <Tab key={index} label={category.name} />
        ))}
      </Tabs>

      <Grid container spacing={3}>
        {categories[tabValue].tools.map((tool, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)'
                }
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Box sx={{ color: 'primary.main', fontSize: 40, mb: 2 }}>
                  {tool.icon}
                </Box>
                <Typography gutterBottom variant="h5" component="h2">
                  {tool.name}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2, textAlign: 'center' }}>
                <Button 
                  variant="outlined" 
                  fullWidth 
                  href={tool.path}
                >
                  Open Tool
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Tools;
