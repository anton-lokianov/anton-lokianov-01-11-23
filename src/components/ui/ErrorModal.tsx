import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import ReactDOM from "react-dom";
import Button from "./Button";

type ErrorModalProps = {
  showModal: boolean;
  message: string;
  onClose: () => void;
};

const ErrorModal = ({ showModal, message, onClose }: ErrorModalProps) => {
  const isLightMode = useSelector((state: RootState) => state.ui.theme);
  if (!showModal) {
    return null;
  }

  const modalContent = (
    <div
      className={`fixed z-50 inset-0 overflow-y-auto  ${
        isLightMode ? "text-slate-800" : "text-black"
      }`}
      onClick={onClose}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div
          className={`fixed inset-0 transition-opacity ${
            isLightMode
              ? "bg-slate-800 bg-opacity-75"
              : "bg-slate-400 bg-opacity-75"
          }`}
        ></div>

        <div
          className={`${
            isLightMode ? "bg-gray-100" : "bg-white"
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
            <Button
              type="button"
              className={`w-full inline-flex justify-center rounded-md ${
                isLightMode ? "border-gray-700" : "border-gray-300"
              } px-4 py-2 ${
                isLightMode ? "bg-gray-700" : "bg-blue-700"
              } text-base leading-6 font-medium ${
                isLightMode ? "text-gray-300 bg-blue-500" : "text-gray-700"
              } shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5`}
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default ErrorModal;
