export class UserProfile {
  id: number;
  phoneNumber: number;
  address: string;
  linkedinLink: string;
  syllabus: any;
  profilePicture: string;
  jobTitle: string;
  jobDescription: string;
  userAccount: any;
  cvFile: string;
  creationDate: Date;
  updateDate: Date;
  _links: {
    self: {
      href: string;
    };
    userProfile: {
      href: string;
      userAccount: {
        href: string;
      };
    };
  };
}
