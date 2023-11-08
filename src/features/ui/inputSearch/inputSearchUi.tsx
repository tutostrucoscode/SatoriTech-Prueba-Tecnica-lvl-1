import {
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";
import { IconSearch } from "@tabler/icons-react";

type Props = {
  locationId: string;
  handleLocationChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => Promise<void>;
  loading: boolean;
};

const InputSearchUi = ({
  locationId,
  handleLocationChange,
  loading,
}: Props) => {
  return (
    <>
      <InputGroup>
        <Input
          placeholder="id location"
          w="300px"
          value={locationId}
          onChange={handleLocationChange}
        />
        <InputRightElement>
          {loading ? <Spinner color="black" /> : <IconSearch color="black" />}
        </InputRightElement>
      </InputGroup>
    </>
  );
};

export default InputSearchUi;
