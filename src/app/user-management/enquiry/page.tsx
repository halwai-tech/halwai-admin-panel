"use client";
import React, { useEffect, useState } from "react";
import DomesticEnquiry from "@/components/userManagement/enquiry/DomesticEnquiry";
import MonthlyEnquiry from "@/components/userManagement/enquiry/MonthlyEnquiry";
import ProfessionalChefEnquiry from "@/components/userManagement/enquiry/ProfessionalChefEnquiry";
import { enquiryController } from "@/api/enquiryController";

interface ICategoryPagination {
  page: number;
  total: number;
  totalPages: number;
}

interface IPagination {
  domestic: ICategoryPagination;
  monthly: ICategoryPagination;
  professional: ICategoryPagination;
}

interface IEnquiryData {
  domestic: any[];
  monthly: any[];
  professional: any[];
}

interface IPaginationControls {
  domesticPage: number;
  monthlyPage: number;
  professionalPage: number;
  limit: number;
}

const EnquiryList: React.FC = () => {
  const [pagination, setPagination] = useState<IPagination>({
    domestic: { page: 1, total: 0, totalPages: 1 },
    monthly: { page: 1, total: 0, totalPages: 1 },
    professional: { page: 1, total: 0, totalPages: 1 },
  });

  const [enquiryData, setEnquiryData] = useState<IEnquiryData>({
    domestic: [],
    monthly: [],
    professional: [],
  });

  const [paginationControls, setPaginationControls] =
    useState<IPaginationControls>({
      domesticPage: 1,
      monthlyPage: 1,
      professionalPage: 1,
      limit: 5,
    });

  useEffect(() => {
    async function fetchAllEnquiry() {
      try {
        const response = await enquiryController.getAllEnquiry(
          paginationControls.domesticPage,
          paginationControls.monthlyPage,
          paginationControls.professionalPage,
          paginationControls.limit
        );

        if (response?.data?.success) {
          setEnquiryData({
            domestic: response.data.data.domestic,
            monthly: response.data.data.monthly,
            professional: response.data.data.professional,
          });
          setPagination(response.data.pagination); // update pagination from backend
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchAllEnquiry();
  }, [
    paginationControls.domesticPage,
    paginationControls.monthlyPage,
    paginationControls.professionalPage,
    paginationControls.limit,
  ]);

  return (
    <div>
      <DomesticEnquiry
        paginationControls={paginationControls}
        setPaginationControls={setPaginationControls}
        pagination={pagination}
        setPagination={setPagination}
        enquiryData={enquiryData}
      />
      <MonthlyEnquiry
        paginationControls={paginationControls}
        setPaginationControls={setPaginationControls}
        pagination={pagination}
        setPagination={setPagination}
        enquiryData={enquiryData}
      />
      <ProfessionalChefEnquiry
        paginationControls={paginationControls}
        setPaginationControls={setPaginationControls}
        pagination={pagination}
        setPagination={setPagination}
        enquiryData={enquiryData}
      />
    </div>
  );
};

export default EnquiryList;
