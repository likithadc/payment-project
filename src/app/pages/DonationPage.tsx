import { useState } from 'react';
import { SiteHeader } from '../components/tree/SiteHeader';
import { TabNavigation } from '../components/tree/TabNavigation';
import { StepProgress } from '../components/tree/StepProgress';
import { TreeSelector } from '../components/tree/TreeSelector';
import { OccasionSelector } from '../components/tree/OccasionSelector';
import { DetailsForm } from '../components/tree/DetailsForm';
import { ReviewConfirm } from '../components/tree/ReviewConfirm';
import { PaymentGateway } from '../components/tree/PaymentGateway';
import { SuccessPage } from '../components/tree/SuccessPage';
import { WhatHappensNext } from '../components/tree/WhatHappensNext';
import { OccasionGifting } from '../components/tree/OccasionGifting';
import { ImpactCalculator } from '../components/tree/ImpactCalculator';
import { RealImpact } from '../components/tree/RealImpact';
import { FAQ } from '../components/tree/FAQ';
import { FinalCTA } from '../components/tree/FinalCTA';
import { SiteFooter } from '../components/tree/SiteFooter';
import { generateCertificatePDF, generateReceiptPDF } from '../components/tree/PDFCertificate';

export function DonationPage() {
  const [activeTab, setActiveTab] = useState<'plant' | 'gift'>('plant');
  const [currentStep, setCurrentStep] = useState(1);
  const [transactionId, setTransactionId] = useState('');

  const [selectedItem, setSelectedItem] = useState({
    name: 'Common Species',
    icon: '🌿',
    quantity: 1,
    price: 100
  });

  const [userDetails, setUserDetails] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    birthday: '',
    anniversary: ''
  });

  const handleContinueToDetails = () => {
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToSelection = () => {
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContinueToReview = () => {
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToDetails = () => {
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContinueToPayment = () => {
    setCurrentStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToReview = () => {
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePaymentSuccess = (txnId: string) => {
    setTransactionId(txnId);
    setCurrentStep(5);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownloadCertificate = () => {
    const treeId = 'TREE' + Date.now();
    generateCertificatePDF({
      treeId,
      donorName: userDetails.fullName,
      numberOfTrees: selectedItem.quantity,
      treeName: selectedItem.name,
      location: 'Bangalore, Karnataka',
      date: new Date().toLocaleDateString(),
      transactionId
    });
  };

  const handleDownloadReceipt = () => {
    generateReceiptPDF({
      donorName: userDetails.fullName,
      amount: selectedItem.price * selectedItem.quantity,
      date: new Date().toLocaleDateString(),
      transactionId,
      numberOfTrees: selectedItem.quantity,
      treeName: selectedItem.name,
      email: userDetails.email,
      phone: userDetails.phone
    });
  };

  const handleViewTrees = () => {
    alert('Dashboard feature coming soon!');
  };

  const handleSelectOccasion = (occasionId: string) => {
    setActiveTab('gift');
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlantTreeClick = () => {
    setCurrentStep(1);
    setActiveTab('plant');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGiftTreeClick = () => {
    setCurrentStep(1);
    setActiveTab('gift');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showProgressSteps = currentStep <= 4;
  const showBottomSections = currentStep <= 4;

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader onPlantTreeClick={handlePlantTreeClick} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {showProgressSteps && (
          <>
            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
            <StepProgress currentStep={currentStep} />
          </>
        )}

        <div className="mb-16">
          {currentStep === 1 && (
            <div className="max-w-5xl mx-auto">
              {activeTab === 'plant' ? (
                <TreeSelector onContinue={handleContinueToDetails} />
              ) : (
                <OccasionSelector onContinue={handleContinueToDetails} />
              )}
            </div>
          )}

          {currentStep === 2 && (
            <DetailsForm
            onBack={handleBackToSelection}
            onContinue={handleContinueToReview}
            totalPrice={selectedItem.price * selectedItem.quantity}
            isGift={activeTab === 'gift'}  // 👈 ADD THIS LINE
  />
)}

          {currentStep === 3 && (
            <ReviewConfirm
              onBack={handleBackToDetails}
              onContinue={handleContinueToPayment}
              selectedItem={selectedItem}
              userDetails={userDetails}
              isGift={activeTab === 'gift'}
            />
          )}

          {currentStep === 4 && (
            <PaymentGateway
              onBack={handleBackToReview}
              onSuccess={handlePaymentSuccess}
              amount={selectedItem.price * selectedItem.quantity}
            />
          )}

          {currentStep === 5 && (
            <SuccessPage
              transactionId={transactionId}
              selectedItem={selectedItem}
              userDetails={userDetails}
              onViewTrees={handleViewTrees}
              onDownloadReceipt={handleDownloadReceipt}
              onDownloadCertificate={handleDownloadCertificate}
            />
          )}
        </div>

        {showBottomSections && (
          <>
            <WhatHappensNext />
            {activeTab === 'plant' && currentStep === 1 && <OccasionGifting onSelectOccasion={handleSelectOccasion} />}
            <ImpactCalculator />
            <RealImpact />
            {currentStep === 1 && <FinalCTA onPlantTree={handlePlantTreeClick} />}
          </>
        )}
      </main>

      <SiteFooter onPlantTreeClick={handlePlantTreeClick} onGiftTreeClick={handleGiftTreeClick} />
    </div>
  );
}
