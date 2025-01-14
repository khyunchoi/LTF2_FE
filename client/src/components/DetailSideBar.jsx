import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as detailInfo from "../styles/detailInfoStyle";
import { LGButton } from "./Button";
import MessageModal from "./MessageModal";

export default function DetailSideBar({ active, priceInfo, saveCart }) {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState({
    message: "",
    btnMessage: "",
    func: "",
  });
  const changeModalMsg = (message, btnMessage, func) =>
    setModalMsg({ message, btnMessage, func });

  const goToCart = () => {
    switch (saveCart(active)) {
      case "success": {
        changeModalMsg(
          "장바구니에 주문이 저장되었습니다.",
          "장바구니로 이동",
          () => navigate("/cart")
        );
        setOpen(true);
        break;
      }
      case "alreadyExist": {
        changeModalMsg("이미 존재하는 주문 정보입니다!", "", "");
        setOpen(true);
        break;
      }
      default: {
        changeModalMsg(
          "알 수 없는 오류가 발생했습니다. \n불편을 드려 죄송합니다.",
          "",
          ""
        );
        setOpen(true);
        break;
      }
    }
  };

  const goToOrder = () => {
    navigate("/order", { state: active });
  };

  return (
    <detailInfo.SideBarContainer>
      <MessageModal
        open={open}
        setOpen={setOpen}
        message={modalMsg.message}
        btnMessage={modalMsg.btnMessage}
        func={modalMsg.func}
      />
      <h2>{active.phone.titleName}</h2>
      <p>{`${active.color.name} | 256GB`}</p>
      <hr />
      <h3>최종 결제금액 계산</h3>
      <detailInfo.SideFlex>
        <h3 className="left">
          {active.installment === 1
            ? "기기 완납 결제 가격"
            : "월 휴대폰 할부금"}
        </h3>
        <h3 className="right">{priceInfo.phone.toLocaleString()} 원</h3>
      </detailInfo.SideFlex>
      <detailInfo.SideFlex>
        <p className="left">정상가</p>
        <p className="right">{active.phone.price.toLocaleString()} 원</p>
      </detailInfo.SideFlex>
      {active.discount === "공시지원금" && (
        <div>
          <detailInfo.SideFlex>
            <p className="left">공시지원금 (sample)</p>
            <p className="right" style={{ color: "#e6007e" }}>
              -{active.supportPrice.toLocaleString()} 원
            </p>
          </detailInfo.SideFlex>
          <detailInfo.SideFlex>
            <p className="left">추가지원금 (sample)</p>
            <p className="right" style={{ color: "#e6007e" }}>
              -{(active.supportPrice * 0.15).toLocaleString()} 원
            </p>
          </detailInfo.SideFlex>
        </div>
      )}
      <detailInfo.SideFlex>
        <p className="left">실구매가</p>
        <p className="right">
          {(active.phone.price - active.supportPrice * 1.15).toLocaleString()}{" "}
          원
        </p>
      </detailInfo.SideFlex>
      {active.installment !== 1 && (
        <div>
          <detailInfo.SideFlex>
            <p className="left">할부 개월수</p>
            <p className="right">{active.installment}개월</p>
          </detailInfo.SideFlex>
          <detailInfo.SideFlex>
            <p className="left">할부수수료 (연 5.9%)</p>
            <p className="right">
              {priceInfo.installmentFee.toLocaleString()} 원
            </p>
          </detailInfo.SideFlex>
        </div>
      )}
      <hr />
      <detailInfo.SideFlex>
        <h3 className="left">월 통신료</h3>
        <h3 className="right">{priceInfo.plan.toLocaleString()} 원</h3>
      </detailInfo.SideFlex>
      <detailInfo.SideFlex>
        <p className="left">{active.plan.name}</p>
        <p className="right">{active.plan.month_price.toLocaleString()} 원</p>
      </detailInfo.SideFlex>
      {active.discount.indexOf("선택약정") !== -1 && (
        <detailInfo.SideFlex>
          <p className="left">선택 약정 할인</p>
          <p className="right" style={{ color: "#e6007e" }}>
            -{(active.plan.month_price * 0.25).toLocaleString()} 원
          </p>
        </detailInfo.SideFlex>
      )}
      <hr />
      <detailInfo.SideFlex>
        <h3 className="left">월 납부금액</h3>
        <h3 className="right">{priceInfo.total.toLocaleString()} 원</h3>
      </detailInfo.SideFlex>
      <LGButton variant="primary" size="lg" onClick={goToOrder}>
        온라인 주문
      </LGButton>
      <LGButton variant="outline-dark" size="lg" onClick={goToCart}>
        장바구니
      </LGButton>
    </detailInfo.SideBarContainer>
  );
}
