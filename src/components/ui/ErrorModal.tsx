import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

type ErrorModalProps = {
  showModal: boolean;
  message: string;
  onClose: () => void;
};

const ErrorModal = ({ showModal, message, onClose }: ErrorModalProps) => {
  const theme = useSelector((state: RootState) => state.ui.theme);
  if (!showModal) {
    return null;
  }

  return (
    <div
      className={`fixed z-50 inset-0 overflow-y-auto  ${
        theme ? "text-slate-800" : "text-black"
      }`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div
          className={`fixed inset-0 transition-opacity ${
            theme ? "bg-slate-800 bg-opacity-75" : "bg-slate-400 bg-opacity-75"
          }`}
          onClick={onClose}
        ></div>

        <div
          className={`${
            theme ? "bg-gray-100" : "bg-white"
          } rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full`}
        >
          <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left">
                <h3 className="text-lg leading-6 font-medium">Error</h3>
                <div className="mt-2">
                  <p className="text-sm">{message}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className={`w-full inline-flex justify-center rounded-md ${
                theme ? "border-gray-700" : "border-gray-300"
              } px-4 py-2 ${
                theme ? "bg-gray-700" : "bg-white"
              } text-base leading-6 font-medium ${
                theme ? "text-gray-300 bg-blue-500" : "text-gray-700"
              } shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5`}
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
