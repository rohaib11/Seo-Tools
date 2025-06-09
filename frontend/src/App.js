import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';

// Main Pages
import Home from './pages/Home';
import Tools from './pages/Tools';
import Pricing from './pages/Pricing';
import About from './pages/About';

// Unit Converters
import TimeConverter from './pages/unit-converter/TimeConverter';
import PowerConverter from './pages/unit-converter/PowerConverter';
import SpeedConverter from './pages/unit-converter/SpeedConverter';
import VolumeConverter from './pages/unit-converter/VolumeConverter';
import LengthConverter from './pages/unit-converter/LengthConverter';
import VoltageConverter from './pages/unit-converter/VoltageConverter';
import AreaConverter from './pages/unit-converter/AreaConverter';
import WeightConverter from './pages/unit-converter/WeightConverter';
import ByteConverter from './pages/unit-converter/ByteConverter';
import TemperatureConverter from './pages/unit-converter/TemperatureConverter';
import TorqueConverter from './pages/unit-converter/TorqueConverter';
import PressureConverter from './pages/unit-converter/PressureConverter';

// Binary Converters
import TextToBinary from './pages/binary-converter/TextToBinary';
import BinaryToText from './pages/binary-converter/BinaryToText';
import BinaryToHEX from './pages/binary-converter/BinaryToHEX';
import HexToBinary from './pages/binary-converter/HexToBinary';
import BinaryToDecimal from './pages/binary-converter/BinaryToDecimal';
import DecimalToBinary from './pages/binary-converter/DecimalToBinary';
import TextToASCII from './pages/binary-converter/TextToASCII';
import BinaryToASCII from './pages/binary-converter/BinaryToASCII';
import ASCIIToBinary from './pages/binary-converter/ASCIIToBinary';
import DecimalToHEX from './pages/binary-converter/DecimalToHEX';
import BinaryTranslator from './pages/binary-converter/BinaryTranslator';
import EnglishToBinary from './pages/binary-converter/EnglishToBinary';
import BinaryToEnglish from './pages/binary-converter/BinaryToEnglish';
import BinaryDecoder from './pages/binary-converter/BinaryDecoder';
import HexToText from './pages/binary-converter/HexToText';

// Online Calculators
import AgeCalculator from './pages/online-calculators/AgeCalculator';
import PercentageCalculator from './pages/online-calculators/PercentageCalculator';
import AverageCalculator from './pages/online-calculators/AverageCalculator';
import ConfidenceIntervalCalculator from './pages/online-calculators/ConfidenceIntervalCalculator';
import SalesTaxCalculator from './pages/online-calculators/SalesTaxCalculator';
import MarginCalculator from './pages/online-calculators/MarginCalculator';
import ProbabilityCalculator from './pages/online-calculators/ProbabilityCalculator';
import PaypalFeeCalculator from './pages/online-calculators/PaypalFeeCalculator';
import DiscountCalculator from './pages/online-calculators/DiscountCalculator';
import EarningsPerShareCalculator from './pages/online-calculators/EarningsPerShareCalculator';
import CPMCalculator from './pages/online-calculators/CPMCalculator';
import LoanToValueCalculator from './pages/online-calculators/LoanToValueCalculator';
import GSTCalculator from './pages/online-calculators/GSTCalculator';
import BMICalculator from './pages/online-calculators/BMICalculator';
import ChronologicalAgeCalculator from './pages/online-calculators/ChronologicalAgeCalculator';
import HoursCalculator from './pages/online-calculators/HoursCalculator';
import GradeCalculator from './pages/online-calculators/GradeCalculator';
import GPACalculator from './pages/online-calculators/GPACalculator';
import PercentageIncreaseCalculator from './pages/online-calculators/PercentageIncreaseCalculator';
import PercentageDecreaseCalculator from './pages/online-calculators/PercentageDecreaseCalculator';
import PercentageChangeCalculator from './pages/online-calculators/PercentageChangeCalculator';
import PercentageDifferenceCalculator from './pages/online-calculators/PercentageDifferenceCalculator';
import CalorieCalculator from './pages/online-calculators/CalorieCalculator';
import TimeCalculator from './pages/online-calculators/TimeCalculator';
import SalaryCalculator from './pages/online-calculators/SalaryCalculator';
import InvestmentCalculator from './pages/online-calculators/InvestmentCalculator';
import TDEECalculator from './pages/online-calculators/TDEECalculator';
import MeanMedianModeCalculator from './pages/online-calculators/MeanMedianModeCalculator';

// Import Image Editing Tools
import ReverseImageSearch from './pages/image-editing-tools/ReverseImageSearch';
import FaceSearch from './pages/image-editing-tools/FaceSearch';
import ImageCompressor from './pages/image-editing-tools/ImageCompressor';
import FaviconGenerator from './pages/image-editing-tools/FaviconGenerator';
import VideoToGIFConverter from './pages/image-editing-tools/VideoToGIFConverter';
import ImageResizer from './pages/image-editing-tools/ImageResizer';
import PhotoResizerInKB from './pages/image-editing-tools/PhotoResizerInKB';
import CropImage from './pages/image-editing-tools/CropImage';
import ConvertToJPG from './pages/image-editing-tools/ConvertToJPG';
import RGBToHex from './pages/image-editing-tools/RGBToHex';
import PNGToJPG from './pages/image-editing-tools/PNGToJPG';
import JPGToPNG from './pages/image-editing-tools/JPGToPNG';
import CompressImageTo50KB from './pages/image-editing-tools/CompressImageTo50KB';
import CompressImageTo200KB from './pages/image-editing-tools/CompressImageTo200KB';
import CompressJPEGTo100KB from './pages/image-editing-tools/CompressJPEGTo100KB';
import CompressJPEGTo200KB from './pages/image-editing-tools/CompressJPEGTo200KB';
import CompressJPG from './pages/image-editing-tools/CompressJPG';
import ResizeImageTo50KB from './pages/image-editing-tools/ResizeImageTo50KB';
import CompressPNG from './pages/image-editing-tools/CompressPNG';
import CompressImageTo10KB from './pages/image-editing-tools/CompressImageTo10KB';
import CompressImageTo30KB from './pages/image-editing-tools/CompressImageTo30KB';
import CompressImageTo1MB from './pages/image-editing-tools/CompressImageTo1MB';
import MBToKBConverter from './pages/image-editing-tools/MBToKBConverter';
import MP4ToGIFConverter from './pages/image-editing-tools/MP4ToGIFConverter';
import HEICToJPGConverter from './pages/image-editing-tools/HEICToJPGConverter';
import HEICToPNG from './pages/image-editing-tools/HEICToPNG';
import SVGConverter from './pages/image-editing-tools/SVGConverter';
import PNGToSVG from './pages/image-editing-tools/PNGToSVG';
import JPGToSVG from './pages/image-editing-tools/JPGToSVG';
import JPEGToSVG from './pages/image-editing-tools/JPEGToSVG';
import WEBPToPNG from './pages/image-editing-tools/WEBPToPNG';
import SVGToPNG from './pages/image-editing-tools/SVGToPNG';
import PNGToICO from './pages/image-editing-tools/PNGToICO';
import AVIFToJPG from './pages/image-editing-tools/AVIFToJPG';
import JPEGOptimizer from './pages/image-editing-tools/JPEGOptimizer';


// PDF Tools
import MergePDF from './pages/pdf-tools/MergePDF';
import RotatePDF from './pages/pdf-tools/RotatePDF';
import UnlockPDF from './pages/pdf-tools/UnlockPDF';
import LockPDF from './pages/pdf-tools/LockPDF';
import WatermarkPDF from './pages/pdf-tools/WatermarkPDF';
import PDFToWord from './pages/pdf-tools/PDFToWord';
import WordToPDF from './pages/pdf-tools/WordToPDF';
import PDFToJPG from './pages/pdf-tools/PDFToJPG';
import JPGToPDF from './pages/pdf-tools/JPGToPDF';
import PowerPointToPDF from './pages/pdf-tools/PowerPointToPDF';
import CompressPDF from './pages/pdf-tools/CompressPDF';
import SplitPDF from './pages/pdf-tools/SplitPDF';
import ResizePDF from './pages/pdf-tools/ResizePDF';
import DeletePagesFromPDF from './pages/pdf-tools/DeletePagesFromPDF';
import ExcelToPDF from './pages/pdf-tools/ExcelToPDF';


const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />

          {/* Unit Converter Routes */}
          <Route path="/unit-converter/time" element={<TimeConverter />} />
          <Route path="/unit-converter/power" element={<PowerConverter />} />
          <Route path="/unit-converter/speed" element={<SpeedConverter />} />
          <Route path="/unit-converter/volume" element={<VolumeConverter />} />
          <Route path="/unit-converter/length" element={<LengthConverter />} />
          <Route path="/unit-converter/voltage" element={<VoltageConverter />} />
          <Route path="/unit-converter/area" element={<AreaConverter />} />
          <Route path="/unit-converter/weight" element={<WeightConverter />} />
          <Route path="/unit-converter/byte" element={<ByteConverter />} />
          <Route path="/unit-converter/temperature" element={<TemperatureConverter />} />
          <Route path="/unit-converter/torque" element={<TorqueConverter />} />
          <Route path="/unit-converter/pressure" element={<PressureConverter />} />

{/* PDF Tools Routes */}
<Route path="/pdf-tools/merge" element={<MergePDF />} />
<Route path="/pdf-tools/rotate" element={<RotatePDF />} />
<Route path="/pdf-tools/unlock" element={<UnlockPDF />} />
<Route path="/pdf-tools/lock" element={<LockPDF />} />
<Route path="/pdf-tools/watermark" element={<WatermarkPDF />} />
<Route path="/pdf-tools/pdf-to-word" element={<PDFToWord />} />
<Route path="/pdf-tools/word-to-pdf" element={<WordToPDF />} />
<Route path="/pdf-tools/pdf-to-jpg" element={<PDFToJPG />} />
<Route path="/pdf-tools/jpg-to-pdf" element={<JPGToPDF />} />
<Route path="/pdf-tools/ppt-to-pdf" element={<PowerPointToPDF />} />
<Route path="/pdf-tools/compress" element={<CompressPDF />} />
<Route path="/pdf-tools/split" element={<SplitPDF />} />
<Route path="/pdf-tools/resize" element={<ResizePDF />} />
<Route path="/pdf-tools/delete-pages" element={<DeletePagesFromPDF />} />
<Route path="/pdf-tools/excel-to-pdf" element={<ExcelToPDF />} />


          {/* Binary Converter Routes */}
          <Route path="/binary-converter/text-to-binary" element={<TextToBinary />} />
          <Route path="/binary-converter/binary-to-text" element={<BinaryToText />} />
          <Route path="/binary-converter/binary-to-hex" element={<BinaryToHEX />} />
          <Route path="/binary-converter/hex-to-binary" element={<HexToBinary />} />
          <Route path="/binary-converter/binary-to-decimal" element={<BinaryToDecimal />} />
          <Route path="/binary-converter/decimal-to-binary" element={<DecimalToBinary />} />
          <Route path="/binary-converter/text-to-ascii" element={<TextToASCII />} />
          <Route path="/binary-converter/binary-to-ascii" element={<BinaryToASCII />} />
          <Route path="/binary-converter/ascii-to-binary" element={<ASCIIToBinary />} />
          <Route path="/binary-converter/decimal-to-hex" element={<DecimalToHEX />} />
          <Route path="/binary-converter/binary-translator" element={<BinaryTranslator />} />
          <Route path="/binary-converter/english-to-binary" element={<EnglishToBinary />} />
          <Route path="/binary-converter/binary-to-english" element={<BinaryToEnglish />} />
          <Route path="/binary-converter/binary-decoder" element={<BinaryDecoder />} />
          <Route path="/binary-converter/hex-to-text" element={<HexToText />} />

{/* Image Editing Tools Routes */}
<Route path="/image-editing-tools/reverse-image-search" element={<ReverseImageSearch />} />
<Route path="/image-editing-tools/face-search" element={<FaceSearch />} />
<Route path="/image-editing-tools/image-compressor" element={<ImageCompressor />} />
<Route path="/image-editing-tools/favicon-generator" element={<FaviconGenerator />} />
<Route path="/image-editing-tools/video-to-gif-converter" element={<VideoToGIFConverter />} />
<Route path="/image-editing-tools/image-resizer" element={<ImageResizer />} />
<Route path="/image-editing-tools/photo-resizer-in-kb" element={<PhotoResizerInKB />} />
<Route path="/image-editing-tools/crop-image" element={<CropImage />} />
<Route path="/image-editing-tools/convert-to-jpg" element={<ConvertToJPG />} />
<Route path="/image-editing-tools/rgb-to-hex" element={<RGBToHex />} />
<Route path="/image-editing-tools/png-to-jpg" element={<PNGToJPG />} />
<Route path="/image-editing-tools/jpg-to-png" element={<JPGToPNG />} />
<Route path="/image-editing-tools/compress-image-to-50kb" element={<CompressImageTo50KB />} />
<Route path="/image-editing-tools/compress-image-to-200kb" element={<CompressImageTo200KB />} />
<Route path="/image-editing-tools/compress-jpeg-to-100kb" element={<CompressJPEGTo100KB />} />
<Route path="/image-editing-tools/compress-jpeg-to-200kb" element={<CompressJPEGTo200KB />} />
<Route path="/image-editing-tools/compress-jpg" element={<CompressJPG />} />
<Route path="/image-editing-tools/resize-image-to-50kb" element={<ResizeImageTo50KB />} />
<Route path="/image-editing-tools/compress-png" element={<CompressPNG />} />
<Route path="/image-editing-tools/compress-image-to-10kb" element={<CompressImageTo10KB />} />
<Route path="/image-editing-tools/compress-image-to-30kb" element={<CompressImageTo30KB />} />
<Route path="/image-editing-tools/compress-image-to-1mb" element={<CompressImageTo1MB />} />
<Route path="/image-editing-tools/mb-to-kb-converter" element={<MBToKBConverter />} />
<Route path="/image-editing-tools/mp4-to-gif-converter" element={<MP4ToGIFConverter />} />
<Route path="/image-editing-tools/heic-to-jpg-converter" element={<HEICToJPGConverter />} />
<Route path="/image-editing-tools/heic-to-png" element={<HEICToPNG />} />
<Route path="/image-editing-tools/svg-converter" element={<SVGConverter />} />
<Route path="/image-editing-tools/png-to-svg" element={<PNGToSVG />} />
<Route path="/image-editing-tools/jpg-to-svg" element={<JPGToSVG />} />
<Route path="/image-editing-tools/jpeg-to-svg" element={<JPEGToSVG />} />
<Route path="/image-editing-tools/webp-to-png" element={<WEBPToPNG />} />
<Route path="/image-editing-tools/svg-to-png" element={<SVGToPNG />} />
<Route path="/image-editing-tools/png-to-ico" element={<PNGToICO />} />
<Route path="/image-editing-tools/avif-to-jpg" element={<AVIFToJPG />} />
<Route path="/image-editing-tools/jpeg-optimizer" element={<JPEGOptimizer />} />

          {/* Online Calculator Routes */}
          <Route path="/online-calculators/age" element={<AgeCalculator />} />
          <Route path="/online-calculators/percentage" element={<PercentageCalculator />} />
          <Route path="/online-calculators/average" element={<AverageCalculator />} />
          <Route path="/online-calculators/confidence-interval" element={<ConfidenceIntervalCalculator />} />
          <Route path="/online-calculators/sales-tax" element={<SalesTaxCalculator />} />
          <Route path="/online-calculators/margin" element={<MarginCalculator />} />
          <Route path="/online-calculators/probability" element={<ProbabilityCalculator />} />
          <Route path="/online-calculators/paypal-fee" element={<PaypalFeeCalculator />} />
          <Route path="/online-calculators/discount" element={<DiscountCalculator />} />
          <Route path="/online-calculators/earnings-per-share" element={<EarningsPerShareCalculator />} />
          <Route path="/online-calculators/cpm" element={<CPMCalculator />} />
          <Route path="/online-calculators/loan-to-value" element={<LoanToValueCalculator />} />
          <Route path="/online-calculators/gst" element={<GSTCalculator />} />
          <Route path="/online-calculators/bmi" element={<BMICalculator />} />
          <Route path="/online-calculators/chronological-age" element={<ChronologicalAgeCalculator />} />
          <Route path="/online-calculators/hours" element={<HoursCalculator />} />
          <Route path="/online-calculators/grade" element={<GradeCalculator />} />
          <Route path="/online-calculators/gpa" element={<GPACalculator />} />
          <Route path="/online-calculators/percentage-increase" element={<PercentageIncreaseCalculator />} />
          <Route path="/online-calculators/percentage-decrease" element={<PercentageDecreaseCalculator />} />
          <Route path="/online-calculators/percentage-change" element={<PercentageChangeCalculator />} />
          <Route path="/online-calculators/percentage-difference" element={<PercentageDifferenceCalculator />} />
          <Route path="/online-calculators/calorie" element={<CalorieCalculator />} />
          <Route path="/online-calculators/time" element={<TimeCalculator />} />
          <Route path="/online-calculators/salary" element={<SalaryCalculator />} />
          <Route path="/online-calculators/investment" element={<InvestmentCalculator />} />
          <Route path="/online-calculators/tdee" element={<TDEECalculator />} />
          <Route path="/online-calculators/mean-median-mode" element={<MeanMedianModeCalculator />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
