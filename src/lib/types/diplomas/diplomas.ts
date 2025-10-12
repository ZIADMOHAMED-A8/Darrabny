type Diploma = {
  _id: string;
  name: string;
  icon: string;
};

type Metadata = {
  currentPage: number;
  numberOfPages: number;
  limit: number;
};

type DiplomaPageResponse = {
  subjects: Diploma[];
  metadata: Metadata;
};