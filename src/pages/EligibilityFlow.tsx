import { BaseText } from "@/components/custom/BaseText";
import { EligibilityContent } from "@/components/custom/EligibilityContent";
import { EligibilityHeader } from "@/components/custom/EligibilityHeader";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const EligibilityFlow = () => {
  const navigate = useNavigate();
  const [pageIndex, setPageIndex] = useState(0);
  const [showBaseText, setShowBaseText] = useState(false);
  return (
    <div className="flex flex-1 flex-col justify-center gap-y-20 items-center md:h-[70%] md:justify-evenly md:gap-y-0">
      {pageIndex == 0 && (
        <>
          <EligibilityHeader onBackPress={() => navigate("/")} />
          <EligibilityContent
            question="Êtes-vous un particulier ou un professionnel ?"
            onYesClick={() => {
              setShowBaseText(false);
              setPageIndex(1);
            }}
            onNoClick={() => {
              setShowBaseText(true);
            }}
            button1Text="Particulier"
            button2Text="Professional"
          />
          {showBaseText && (
            <BaseText text="Désolé, cette subvention n'est proposée que pour les particuliers." />
          )}
        </>
      )}
      {pageIndex == 1 && (
        <>
          <EligibilityHeader onBackPress={() => setPageIndex(0)} />
          <EligibilityContent
            question="S'agit-il de votre résidence principale ?"
            onYesClick={() => {
              setShowBaseText(false);
              setPageIndex(2);
            }}
            onNoClick={() => {
              setShowBaseText(true);
            }}
            button1Text="Oui"
            button2Text="Non"
          />
          {showBaseText && (
            <BaseText text="Désolé, cette subvention n'est proposée que pour les particuliers." />
          )}
        </>
      )}
      {pageIndex == 2 && (
        <>
          <EligibilityHeader onBackPress={() => setPageIndex(1)} />
          <EligibilityContent
            question="S'agit-il d'un chauffage ?"
            onYesClick={() => {
              setShowBaseText(false);
              setPageIndex(3);
            }}
            onNoClick={() => {
              setShowBaseText(true);
            }}
            button1Text="Individuel"
            button2Text="Collectif"
          />
          {showBaseText && (
            <BaseText text="Seuls les chauffages individuels sont concernés pour être éligible." />
          )}
        </>
      )}
      {pageIndex == 3 && (
        <>
          <EligibilityHeader onBackPress={() => setPageIndex(2)} />
          <EligibilityContent
            question="De combien radiateurs votre résidence principale est-elle équipée ?"
            onYesClick={() => {
              setShowBaseText(true);
            }}
            onNoClick={() => {
              setShowBaseText(false);
              setPageIndex(4);
            }}
            button1Text="1"
            button2Text="2 et +"
          />
          {showBaseText && (
            <BaseText text="Pour être éligible votre résidence principale doit être équipée de 2 radiateurs minimum." />
          )}
        </>
      )}
      {pageIndex == 4 && (
        <>
          <EligibilityHeader onBackPress={() => setPageIndex(3)} />
          <EligibilityContent
            question="De combien radiateurs votre résidence principale est-elle équipée ?"
            onYesClick={() => {
              setShowBaseText(false);
              navigate("/details");
            }}
            onNoClick={() => {
              setShowBaseText(true);
            }}
            button1Text="Electrique"
            button2Text="A eau"
          />
          {showBaseText && (
            <BaseText text="Pour être éligible votre résidence principale doit être équipée de 2 radiateurs minimum." />
          )}
        </>
      )}
    </div>
  );
};
