import { Box,  Button, Alert } from '@mui/material';
import ImageToolBase from '../../components/ImageToolBase';
import { Heic2Any } from 'heic2any';

const HEICToPNG = () => {
  const handleConvert = async (file) => {
    try {
      const resultBlob = await Heic2Any({
        blob: file,
        toType: 'image/png',
      });
      return {
        originalFormat: 'HEIC',
        convertedFormat: 'PNG',
        downloadUrl: URL.createObjectURL(resultBlob),
        sizeBefore: (file.size / 1024).toFixed(2),
        sizeAfter: (resultBlob.size / 1024).toFixed(2),
      };
    } catch (error) {
      throw new Error('HEIC conversion failed. Please try another image.');
    }
  };

  const resultComponent = (result) => (
    <Box>
      <Alert severity="success" sx={{ mb: 2 }}>
        Conversion successful! File size changed from {result.sizeBefore}KB to {result.sizeAfter}KB
      </Alert>
      <Button
        variant="contained"
        color="success"
        fullWidth
        href={result.downloadUrl}
        download="converted.png"
      >
        Download PNG
      </Button>
    </Box>
  );

  return (
    <ImageToolBase
      title="HEIC to PNG Converter"
      description="Convert HEIC images (from iPhone) to PNG format"
      acceptedFileTypes={['image/heic', 'image/heif']}
      actionButtonText="Convert to PNG"
      onProcess={handleConvert}
      resultComponent={resultComponent}
    />
  );
};

export default HEICToPNG;