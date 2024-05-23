import { IonCardHeader } from "@ionic/react";
import { BENEFICIARY_DETAILS } from "../../../types/beneficiaries";
import TransparentCard from "@components/cards/Transparentcard/TransparentCard";
import ListSkeletonCard from "@components/loaders/skeleton/card/list";
import { useTranslation } from "react-i18next";
import BeneficiaryCard from "../beneficiary-card";

type Props = {
  beneficiaries: BENEFICIARY_DETAILS[] | [];
  loading: boolean;
  error: any;
};

const BeneficiariesList = ({ beneficiaries, loading }: Props) => {
  const { t } = useTranslation();
  if (loading) return <ListSkeletonCard length={9} />;
  return (
    <>
      {beneficiaries?.length ? (
        beneficiaries.map((el: BENEFICIARY_DETAILS, i: number) => (
          <BeneficiaryCard key={i} beneficiary={el} />
        ))
      ) : (
        <TransparentCard>
          <IonCardHeader className="ion-text-center">
            {t("BENEFICIARIES_PAGE.NO_DATA")}
          </IonCardHeader>
        </TransparentCard>
      )}
    </>
  );
};

export default BeneficiariesList;
