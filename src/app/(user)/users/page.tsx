"use client";

import { useEffect, useState } from "react";
import CustomPagination from "@/components/CustomPagination";
import CustomTable from "@/components/CustomTable";
import { useGetUserPagingMutation } from "@/state/api/userApi";
import { debounce } from 'lodash';

interface SearchCriteria {
  code?: string;
  country?: string;
  email?: string;
  firstName?: string;
  gender?: string;
  lastName?: string;
  phoneNumber?: string;
  username?: string;
  roleName?: string;
}

interface SortConfig {
  field: keyof User;
  direction: "asc" | "desc" | null;
}

const UserManagement = () => {
  // Constants
  const DEFAULT_PAGE_SIZE = 100;
  const DEFAULT_PAGE = 1;

  // Column definitions
  const columns: TableColumn<User>[] = [
    {
      field: "username",
      header: "Username",
      width: "100px",
      searchable: true,
      sortable: true,
    },
    {
      field: "code",
      header: "Code",
      searchable: true,
      sortable: true,
    },
    {
      field: "firstName",
      header: "First Name",
      searchable: true,
      sortable: true,
    },
    {
      field: "lastName",
      header: "Last Name",
      align: "right",
      searchable: true,
      sortable: true,
    },
    {
      field: "email",
      header: "Email",
      align: "right",
      searchable: true,
      sortable: true,
    },
    {
      field: "phoneNumber",
      header: "Phone Number",
      align: "right",
      searchable: true,
      sortable: true,
    },
    {
      field: "country",
      header: "Country",
      align: "right",
      searchable: true,
      sortable: true,
    },
    {
      field: "gender",
      header: "Gender",
      align: "right",
      searchable: true,
      sortable: true,
    },
    {
      field: "roleName",
      header: "Role Name",
      align: "right",
      searchable: true,
      sortable: true,
    },
  ];

  // State
  const [callUserPage] = useGetUserPagingMutation();
  const [searchValues, setSearchValues] = useState<Record<string, string>>({});
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: "updatedDate",
    direction: "desc",
  });
  const [pageNum, setPageNum] = useState(DEFAULT_PAGE);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [totalPage, setTotalPage] = useState(1);
  const [data, setData] = useState<User[]>([]);
  const [debouncedSearchValues, setDebouncedSearchValues] = useState(searchValues);

  // Effects
  useEffect(() => {
    const debounceSearch = debounce(() => {
      setDebouncedSearchValues(searchValues);
    }, 500); // Delay of 500ms

    debounceSearch();

    return () => {
      debounceSearch.cancel();
    };
  }, [searchValues]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const request = {
          criteria: createSearchCriteria(debouncedSearchValues),
          page: pageNum - 1,
          size: pageSize,
          sortBy: sortConfig.field,
          sortDirection: sortConfig.direction,
        };

        const userData = await callUserPage(request).unwrap();
        setData(userData.content);
        setTotalPage(userData.totalPages)
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (debouncedSearchValues) {
      fetchUserData();
    }
  }, [debouncedSearchValues, sortConfig, pageNum, pageSize, callUserPage]);

  // Helper functions
  const createSearchCriteria = (values: Record<string, string>): SearchCriteria => {
    return {
      code: values["code"] || "",
      country: values["country"] || "",
      email: values["email"] || "",
      firstName: values["firstName"] || "",
      gender: values["gender"] || "",
      lastName: values["lastName"] || "",
      phoneNumber: values["phoneNumber"] || "",
      username: values["username"] || "",
      roleName: values["roleName"] || "",
    };
  };

  const handlePageChange = (newPage: number) => {
    setPageNum(newPage);
  };

  // Render
  return (
    <div className="space-y-4">
      <CustomTable
        columns={columns}
        data={data}
        caption="User Management"
        searchValues={searchValues}
        sortConfig={sortConfig}
        onSortChange={setSortConfig}
        onSearchChange={setSearchValues}
      />
      <CustomPagination 
        pageNum={pageNum}
        totalPage={totalPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default UserManagement;